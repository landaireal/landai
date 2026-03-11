// Real data storage service using localStorage

export interface StoredProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  status: 'Active' | 'Pending' | 'Sold';
  image: string;
  description?: string;
  views: number;
  createdAt: number;
  updatedAt: number;
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  avatar?: string;
  biometricId?: string;
  savedProperties: number;
  createdAt: number;
  status: 'Active' | 'Inactive';
}

const STORAGE_KEYS = {
  PROPERTIES: 'landai:admin:properties',
  USERS: 'landai:admin:users',
  ANALYTICS: 'landai:admin:analytics'
};

// Initialize with default data if empty
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers: StoredUser[] = [
      {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@landai.ae',
        password: 'admin123',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff&size=128',
        biometricId: 'bio-admin-123',
        savedProperties: 0,
        createdAt: Date.now(),
        status: 'Active'
      },
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'user@landai.ae',
        password: 'user123',
        role: 'user',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=10b981&color=fff&size=128',
        biometricId: 'bio-user-456',
        savedProperties: 3,
        createdAt: Date.now(),
        status: 'Active'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
    const defaultProperties: StoredProperty[] = [
      {
        id: 'prop-1',
        title: 'Luxury Villa Palm Jumeirah',
        price: 5200000,
        location: 'Palm Jumeirah, Dubai',
        bedrooms: 5,
        bathrooms: 6,
        area: 8500,
        type: 'Villa',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        views: 1234,
        createdAt: Date.now() - 86400000 * 30,
        updatedAt: Date.now()
      },
      {
        id: 'prop-2',
        title: 'Downtown Dubai Penthouse',
        price: 3800000,
        location: 'Downtown Dubai',
        bedrooms: 4,
        bathrooms: 5,
        area: 6200,
        type: 'Penthouse',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        views: 892,
        createdAt: Date.now() - 86400000 * 20,
        updatedAt: Date.now()
      },
      {
        id: 'prop-3',
        title: 'Dubai Marina Apartment',
        price: 1200000,
        location: 'Dubai Marina',
        bedrooms: 2,
        bathrooms: 2,
        area: 1800,
        type: 'Apartment',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
        views: 567,
        createdAt: Date.now() - 86400000 * 10,
        updatedAt: Date.now()
      },
      {
        id: 'prop-4',
        title: 'Business Bay Studio',
        price: 450000,
        location: 'Business Bay, Dubai',
        bedrooms: 1,
        bathrooms: 1,
        area: 650,
        type: 'Studio',
        status: 'Sold',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
        views: 234,
        createdAt: Date.now() - 86400000 * 5,
        updatedAt: Date.now()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(defaultProperties));
  }
};

initializeData();

// Property CRUD operations
export const propertyStorage = {
  getAll: (): StoredProperty[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    return data ? JSON.parse(data) : [];
  },

  getById: (id: string): StoredProperty | null => {
    const properties = propertyStorage.getAll();
    return properties.find(p => p.id === id) || null;
  },

  create: (property: Omit<StoredProperty, 'id' | 'createdAt' | 'updatedAt' | 'views'>): StoredProperty => {
    const properties = propertyStorage.getAll();
    const newProperty: StoredProperty = {
      ...property,
      id: `prop-${Date.now()}`,
      views: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    properties.push(newProperty);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    return newProperty;
  },

  update: (id: string, updates: Partial<StoredProperty>): StoredProperty | null => {
    const properties = propertyStorage.getAll();
    const index = properties.findIndex(p => p.id === id);
    if (index === -1) return null;

    properties[index] = {
      ...properties[index],
      ...updates,
      id,
      updatedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
    return properties[index];
  },

  delete: (id: string): boolean => {
    const properties = propertyStorage.getAll();
    const filtered = properties.filter(p => p.id !== id);
    if (filtered.length === properties.length) return false;
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(filtered));
    return true;
  }
};

// User CRUD operations
export const userStorage = {
  getAll: (): StoredUser[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  getById: (id: string): StoredUser | null => {
    const users = userStorage.getAll();
    return users.find(u => u.id === id) || null;
  },

  getByEmail: (email: string): StoredUser | null => {
    const users = userStorage.getAll();
    return users.find(u => u.email === email) || null;
  },

  create: (user: Omit<StoredUser, 'id' | 'createdAt' | 'savedProperties'>): StoredUser => {
    const users = userStorage.getAll();
    const newUser: StoredUser = {
      ...user,
      id: `user-${Date.now()}`,
      savedProperties: 0,
      createdAt: Date.now()
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return newUser;
  },

  update: (id: string, updates: Partial<StoredUser>): StoredUser | null => {
    const users = userStorage.getAll();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updates,
      id
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return users[index];
  },

  delete: (id: string): boolean => {
    const users = userStorage.getAll();
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) return false;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filtered));
    return true;
  }
};
