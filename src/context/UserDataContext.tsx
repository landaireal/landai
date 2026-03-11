import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type ActivityType = 'view_property' | 'save_property' | 'unsave_property' | 'ai_search';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  timestamp: number;
  meta?: Record<string, unknown>;
}

interface UserDataState {
  savedIds: string[];
  recentlyViewedIds: string[];
  activities: ActivityItem[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string, meta?: Record<string, unknown>) => void;
  markViewed: (id: string, meta?: Record<string, unknown>) => void;
  logActivity: (type: ActivityType, meta?: Record<string, unknown>) => void;
  clearActivities: () => void;
}

const STORAGE_KEYS = {
  saved: 'landai:savedIds',
  recentlyViewed: 'landai:recentlyViewedIds',
  activities: 'landai:activities',
} as const;

const UserDataContext = createContext<UserDataState | undefined>(undefined);

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function uniqStable(ids: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of ids) {
    if (!id) continue;
    if (seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

function makeActivityId() {
  return `act-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(() =>
    uniqStable(safeJsonParse<string[]>(localStorage.getItem(STORAGE_KEYS.saved), []))
  );
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() =>
    uniqStable(safeJsonParse<string[]>(localStorage.getItem(STORAGE_KEYS.recentlyViewed), []))
  );
  const [activities, setActivities] = useState<ActivityItem[]>(() =>
    safeJsonParse<ActivityItem[]>(localStorage.getItem(STORAGE_KEYS.activities), []).slice(0, 200)
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.activities, JSON.stringify(activities.slice(0, 200)));
  }, [activities]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const logActivity = useCallback((type: ActivityType, meta?: Record<string, unknown>) => {
    setActivities((prev) => [{ id: makeActivityId(), type, timestamp: Date.now(), meta }, ...prev].slice(0, 200));
  }, []);

  const toggleSaved = useCallback(
    (id: string, meta?: Record<string, unknown>) => {
      setSavedIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((x) => x !== id) : [id, ...prev];
        return uniqStable(next).slice(0, 200);
      });
      logActivity(savedIds.includes(id) ? 'unsave_property' : 'save_property', { id, ...meta });
    },
    [logActivity, savedIds]
  );

  const markViewed = useCallback(
    (id: string, meta?: Record<string, unknown>) => {
      setRecentlyViewedIds((prev) => uniqStable([id, ...prev]).slice(0, 20));
      logActivity('view_property', { id, ...meta });
    },
    [logActivity]
  );

  const clearActivities = useCallback(() => setActivities([]), []);

  const value = useMemo<UserDataState>(
    () => ({
      savedIds,
      recentlyViewedIds,
      activities,
      isSaved,
      toggleSaved,
      markViewed,
      logActivity,
      clearActivities,
    }),
    [activities, clearActivities, isSaved, logActivity, markViewed, recentlyViewedIds, savedIds, toggleSaved]
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error('useUserData must be used within a UserDataProvider');
  return ctx;
}

