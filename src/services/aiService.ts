/**
 * Advanced AI Service for Real Estate Platforms
 * - Multi-platform property search
 * - Arabic + English query understanding
 * - AI fallback for any visitor question
 * - Unified ranking, recommendations, FAQ, and market insights
 */

export type PropertyType =
  | 'villa'
  | 'apartment'
  | 'penthouse'
  | 'townhouse'
  | 'office'
  | 'shop'
  | 'warehouse'
  | 'land';

export interface Property {
  id: string;
  title: string;
  title_ar?: string;
  location: string;
  location_ar?: string;
  city?: string;
  community?: string;
  country?: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms?: number;
  area: number;
  areaUnit?: 'sqm' | 'sqft';
  type: PropertyType;
  purpose?: 'sale' | 'rent';
  image: string;
  images?: string[];
  description?: string;
  description_ar?: string;
  source?: string;
  sourceUrl?: string;
  amenities?: string[];
  furnished?: boolean;
  verified?: boolean;
  ai_score?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface MarketData {
  region: string;
  priceChange: number;
  avgPrice?: number;
  demandScore?: number;
  rentalYield?: number;
}

export interface PropertySearchCriteria {
  type?: PropertyType;
  purpose?: 'sale' | 'rent';
  location?: string;
  city?: string;
  community?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  furnished?: boolean;
  amenities?: string[];
  keywords?: string[];
}

export interface SearchContext {
  language?: 'en' | 'ar';
  visitorName?: string;
  projectName?: string;
  companyName?: string;
}

export interface AIAnswerResult {
  answer: string;
  properties?: Property[];
  intent:
    | 'property_search'
    | 'property_compare'
    | 'market_insight'
    | 'site_faq'
    | 'general_real_estate'
    | 'general_visitor'
    | 'lead_capture';
  leadSuggested?: boolean;
}

export interface PropertyPlatformAdapter {
  name: string;
  enabled: boolean;
  searchProperties(criteria: PropertySearchCriteria): Promise<Property[]>;
  getPropertyById?(id: string): Promise<Property | null>;
  getAllProperties?(): Promise<Property[]>;
  getMarketData?(): Promise<MarketData[]>;
}

/* -------------------------------------------------------------------------- */
/*                               CONFIG / ENV                                 */
/* -------------------------------------------------------------------------- */

const ENV = {
  OPENAI_API_KEY:
    (globalThis as any)?.process?.env?.OPENAI_API_KEY ??
    (import.meta as any)?.env?.VITE_OPENAI_API_KEY ??
    '',
  OPENAI_MODEL:
    (globalThis as any)?.process?.env?.OPENAI_MODEL ??
    (import.meta as any)?.env?.VITE_OPENAI_MODEL ??
    'gpt-4.1-mini',
  USE_RESPONSES_API:
    String(
      (globalThis as any)?.process?.env?.USE_OPENAI_RESPONSES_API ??
        (import.meta as any)?.env?.VITE_USE_OPENAI_RESPONSES_API ??
        'true'
    ) === 'true',
  APP_NAME:
    (globalThis as any)?.process?.env?.APP_NAME ??
    (import.meta as any)?.env?.VITE_APP_NAME ??
    'Land AI Real Estate',
  SITE_EMAIL:
    (globalThis as any)?.process?.env?.SITE_EMAIL ??
    (import.meta as any)?.env?.VITE_SITE_EMAIL ??
    'info@example.com',
  SITE_PHONE:
    (globalThis as any)?.process?.env?.SITE_PHONE ??
    (import.meta as any)?.env?.VITE_SITE_PHONE ??
    '+971 00 000 0000',
};

/* -------------------------------------------------------------------------- */
/*                           DEMO / LOCAL DATA SOURCE                         */
/* -------------------------------------------------------------------------- */

const localPropertyAPI: PropertyPlatformAdapter = {
  name: 'local',
  enabled: true,
  async searchProperties(criteria) {
    const all = LOCAL_PROPERTIES;
    return filterAndRankProperties(all, criteria);
  },
  async getAllProperties() {
    return LOCAL_PROPERTIES;
  },
  async getMarketData() {
    return LOCAL_MARKET_DATA;
  },
};

const LOCAL_PROPERTIES: Property[] = [
  {
    id: 'villa-1',
    title: 'Spectacular Villa - Palm Jumeirah',
    title_ar: 'فيلا فاخرة - نخلة جميرا',
    location: 'Palm Jumeirah',
    location_ar: 'نخلة جميرا',
    city: 'Dubai',
    community: 'Palm Jumeirah',
    country: 'UAE',
    price: 15500000,
    currency: 'AED',
    bedrooms: 6,
    bathrooms: 8,
    area: 850,
    areaUnit: 'sqm',
    type: 'villa',
    purpose: 'sale',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
    amenities: ['pool', 'sea view', 'parking', 'maid room', 'smart home'],
    furnished: true,
    verified: true,
    ai_score: 95,
  },
  {
    id: 'penthouse-1',
    title: 'Sky Penthouse - Burj Khalifa',
    title_ar: 'بنتهاوس سكاي - برج خليفة',
    location: 'Downtown Dubai - Burj Khalifa',
    location_ar: 'وسط مدينة دبي - برج خليفة',
    city: 'Dubai',
    community: 'Downtown Dubai',
    country: 'UAE',
    price: 45000000,
    currency: 'AED',
    bedrooms: 5,
    bathrooms: 7,
    area: 950,
    areaUnit: 'sqm',
    type: 'penthouse',
    purpose: 'sale',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
    amenities: ['burj view', 'gym', 'concierge', 'parking', 'smart home'],
    furnished: true,
    verified: true,
    ai_score: 98,
  },
  {
    id: 'townhouse-1',
    title: 'Contemporary Townhouse - Arabian Ranches',
    title_ar: 'تاون هاوس عصري - المرابع العربية',
    location: 'Arabian Ranches',
    location_ar: 'المرابع العربية',
    city: 'Dubai',
    community: 'Arabian Ranches',
    country: 'UAE',
    price: 4200000,
    currency: 'AED',
    bedrooms: 4,
    bathrooms: 5,
    area: 380,
    areaUnit: 'sqm',
    type: 'townhouse',
    purpose: 'sale',
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80',
    amenities: ['garden', 'parking', 'community pool'],
    furnished: false,
    verified: true,
    ai_score: 89,
  },
  {
    id: 'apartment-1',
    title: 'Modern Apartment in Downtown',
    title_ar: 'شقة عصرية في وسط المدينة',
    location: 'Downtown Dubai',
    location_ar: 'وسط مدينة دبي',
    city: 'Dubai',
    community: 'Downtown Dubai',
    country: 'UAE',
    price: 180000,
    currency: 'AED',
    bedrooms: 3,
    bathrooms: 3,
    area: 120,
    areaUnit: 'sqm',
    type: 'apartment',
    purpose: 'rent',
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    amenities: ['gym', 'parking', 'balcony'],
    furnished: true,
    verified: true,
    ai_score: 86,
  },
  {
    id: 'land-1',
    title: 'Prime Residential Land - Al Khawaneej',
    title_ar: 'أرض سكنية مميزة - الخوانيج',
    location: 'Al Khawaneej',
    location_ar: 'الخوانيج',
    city: 'Dubai',
    community: 'Al Khawaneej',
    country: 'UAE',
    price: 3500000,
    currency: 'AED',
    bedrooms: 0,
    bathrooms: 0,
    area: 15000,
    areaUnit: 'sqft',
    type: 'land',
    purpose: 'sale',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
    amenities: ['corner plot'],
    furnished: false,
    verified: true,
    ai_score: 80,
  },
];

const LOCAL_MARKET_DATA: MarketData[] = [
  { region: 'Palm Jumeirah', priceChange: 12.4, avgPrice: 15500000, rentalYield: 5.2, demandScore: 91 },
  { region: 'Downtown Dubai', priceChange: 8.1, avgPrice: 3100000, rentalYield: 6.1, demandScore: 88 },
  { region: 'Arabian Ranches', priceChange: 6.4, avgPrice: 4200000, rentalYield: 5.4, demandScore: 82 },
  { region: 'Dubai Marina', priceChange: 7.3, avgPrice: 2600000, rentalYield: 6.5, demandScore: 85 },
  { region: 'Abu Dhabi', priceChange: 5.6, avgPrice: 2200000, rentalYield: 6.0, demandScore: 77 },
];

/* -------------------------------------------------------------------------- */
/*                           OPTIONAL EXTERNAL ADAPTERS                        */
/* -------------------------------------------------------------------------- */

/**
 * مثال adapter خارجي.
 * بدل BASE_URL و TOKEN و mapExternalProperty حسب المنصة التي ستربطها:
 * Property Finder / Bayut / Dubizzle / CRM / ERP / internal API
 */
export function createRestPlatformAdapter(config: {
  name: string;
  enabled?: boolean;
  baseUrl: string;
  token?: string;
  mapProperty: (item: any) => Property;
}): PropertyPlatformAdapter {
  return {
    name: config.name,
    enabled: config.enabled ?? true,
    async searchProperties(criteria: PropertySearchCriteria): Promise<Property[]> {
      const params = new URLSearchParams();

      if (criteria.location) params.set('location', criteria.location);
      if (criteria.city) params.set('city', criteria.city);
      if (criteria.community) params.set('community', criteria.community);
      if (criteria.type) params.set('type', criteria.type);
      if (criteria.purpose) params.set('purpose', criteria.purpose);
      if (criteria.minPrice != null) params.set('minPrice', String(criteria.minPrice));
      if (criteria.maxPrice != null) params.set('maxPrice', String(criteria.maxPrice));
      if (criteria.bedrooms != null) params.set('bedrooms', String(criteria.bedrooms));
      if (criteria.minBedrooms != null) params.set('minBedrooms', String(criteria.minBedrooms));
      if (criteria.maxBedrooms != null) params.set('maxBedrooms', String(criteria.maxBedrooms));
      if (criteria.minArea != null) params.set('minArea', String(criteria.minArea));
      if (criteria.maxArea != null) params.set('maxArea', String(criteria.maxArea));

      const response = await fetch(`${config.baseUrl}/properties/search?${params.toString()}`, {
        headers: config.token
          ? {
              Authorization: `Bearer ${config.token}`,
              'Content-Type': 'application/json',
            }
          : { 'Content-Type': 'application/json' },
      });

      if (!response.ok) return [];
      const data = await response.json();
      const items = Array.isArray(data) ? data : data?.items ?? [];
      return items.map(config.mapProperty);
    },
  };
}

/* -------------------------------------------------------------------------- */
/*                           REGISTERED PLATFORMS                             */
/* -------------------------------------------------------------------------- */

const PLATFORM_ADAPTERS: PropertyPlatformAdapter[] = [
  localPropertyAPI,

  // مثال:
  // createRestPlatformAdapter({
  //   name: 'property-finder',
  //   baseUrl: import.meta.env.VITE_PROPERTY_FINDER_API_URL,
  //   token: import.meta.env.VITE_PROPERTY_FINDER_API_TOKEN,
  //   enabled: Boolean(import.meta.env.VITE_PROPERTY_FINDER_API_URL),
  //   mapProperty: (item) => ({
  //     id: String(item.id),
  //     title: item.title,
  //     location: item.location,
  //     city: item.city,
  //     price: item.price,
  //     currency: item.currency || 'AED',
  //     bedrooms: item.bedrooms || 0,
  //     bathrooms: item.bathrooms || 0,
  //     area: item.area || 0,
  //     areaUnit: item.areaUnit || 'sqm',
  //     type: item.type,
  //     purpose: item.purpose || 'sale',
  //     image: item.image,
  //     verified: item.verified,
  //     source: 'Property Finder',
  //     sourceUrl: item.url,
  //     ai_score: 70,
  //   }),
  // }),
];

/* -------------------------------------------------------------------------- */
/*                         NLP / QUERY UNDERSTANDING                           */
/* -------------------------------------------------------------------------- */

const TYPE_KEYWORDS: Record<string, PropertyType> = {
  villa: 'villa',
  villas: 'villa',
  apartment: 'apartment',
  apartments: 'apartment',
  studio: 'apartment',
  penthouse: 'penthouse',
  penthouses: 'penthouse',
  townhouse: 'townhouse',
  townhouses: 'townhouse',
  office: 'office',
  offices: 'office',
  shop: 'shop',
  shops: 'shop',
  warehouse: 'warehouse',
  land: 'land',

  'فيلا': 'villa',
  'فلل': 'villa',
  'شقة': 'apartment',
  'شقق': 'apartment',
  'ستوديو': 'apartment',
  'بنتهاوس': 'penthouse',
  'تاون هاوس': 'townhouse',
  'تاونهاوس': 'townhouse',
  'مكتب': 'office',
  'محل': 'shop',
  'مستودع': 'warehouse',
  'أرض': 'land',
};

const LOCATION_KEYWORDS = [
  'dubai',
  'downtown dubai',
  'palm jumeirah',
  'business bay',
  'arabian ranches',
  'dubai marina',
  'jbr',
  'abu dhabi',
  'al reem',
  'yas island',
  'نخلة جميرا',
  'وسط مدينة دبي',
  'دبي مارينا',
  'أبو ظبي',
  'الريم',
  'جزيرة ياس',
];

const PURPOSE_KEYWORDS = {
  sale: ['buy', 'purchase', 'sale', 'for sale', 'للبيع', 'شراء', 'اشتري', 'تمليك'],
  rent: ['rent', 'rental', 'for rent', 'إيجار', 'للايجار', 'لإيجار', 'استئجار'],
};

const PRICE_PATTERNS = [
  /(?:under|below|less than|أقل من|تحت)\s*(\d+(?:\.\d+)?)\s*(?:m|million|مليون|k|thousand|ألف)?/i,
  /(?:over|above|more than|أكثر من|فوق)\s*(\d+(?:\.\d+)?)\s*(?:m|million|مليون|k|thousand|ألف)?/i,
  /(\d+(?:\.\d+)?)\s*(?:to|-|حتى)\s*(\d+(?:\.\d+)?)\s*(?:m|million|مليون|k|thousand|ألف)?/i,
  /(\d+(?:\.\d+)?)\s*(?:m|million|مليون)\s*(?:aed|درهم)?/i,
  /(\d+(?:\.\d+)?)\s*(?:k|thousand|ألف)\s*(?:aed|درهم)?/i,
];

const BEDROOM_PATTERNS = [
  /(\d+)\s*(?:bed|beds|bedroom|bedrooms|غرفة|غرف|غرف نوم)/i,
  /(?:one|two|three|four|five|six|seven)\s*(?:bed|bedroom)/i,
];

const NUMBER_WORDS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
};

const AMENITY_KEYWORDS = [
  'pool',
  'gym',
  'sea view',
  'balcony',
  'parking',
  'maid room',
  'smart home',
  'garden',
  'furnished',
  'مسبح',
  'جيم',
  'إطلالة بحر',
  'بلكونة',
  'موقف',
  'غرفة خادمة',
  'مفروشة',
  'حديقة',
];

function normalizeArabic(text: string): string {
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي');
}

function normalizeText(text: string): string {
  return normalizeArabic(text.toLowerCase().trim());
}

function detectLanguage(query: string): 'en' | 'ar' {
  return /[\u0600-\u06FF]/.test(query) ? 'ar' : 'en';
}

function parseMoney(raw: string, fullText: string): number {
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return 0;

  const lower = normalizeText(fullText);

  if (/(million|مليون|\bm\b)/i.test(lower)) return value * 1_000_000;
  if (/(thousand|ألف|\bk\b)/i.test(lower)) return value * 1_000;
  return value;
}

export function parsePropertyQuery(query: string): PropertySearchCriteria {
  const criteria: PropertySearchCriteria = {};
  const lower = normalizeText(query);

  for (const [keyword, type] of Object.entries(TYPE_KEYWORDS)) {
    if (lower.includes(normalizeText(keyword))) {
      criteria.type = type;
      break;
    }
  }

  for (const loc of LOCATION_KEYWORDS) {
    if (lower.includes(normalizeText(loc))) {
      criteria.location = loc;
      break;
    }
  }

  for (const keyword of PURPOSE_KEYWORDS.sale) {
    if (lower.includes(normalizeText(keyword))) {
      criteria.purpose = 'sale';
      break;
    }
  }
  for (const keyword of PURPOSE_KEYWORDS.rent) {
    if (lower.includes(normalizeText(keyword))) {
      criteria.purpose = 'rent';
      break;
    }
  }

  for (const pattern of PRICE_PATTERNS) {
    const match = query.match(pattern);
    if (!match) continue;

    if (match[2]) {
      criteria.minPrice = parseMoney(match[1], query);
      criteria.maxPrice = parseMoney(match[2], query);
      break;
    }

    const parsed = parseMoney(match[1], query);

    if (/under|below|less than|اقل من|تحت/i.test(pattern.source)) {
      criteria.maxPrice = parsed;
    } else if (/over|above|more than|اكثر من|فوق/i.test(pattern.source)) {
      criteria.minPrice = parsed;
    } else {
      criteria.maxPrice = parsed;
    }
    break;
  }

  for (const pattern of BEDROOM_PATTERNS) {
    const match = query.match(pattern);
    if (!match) continue;

    const raw = match[1]?.toLowerCase();
    const numeric = Number(raw);
    if (!Number.isNaN(numeric)) {
      criteria.bedrooms = numeric;
      break;
    }
    if (raw && NUMBER_WORDS[raw]) {
      criteria.bedrooms = NUMBER_WORDS[raw];
      break;
    }
  }

  const amenities = AMENITY_KEYWORDS.filter((item) =>
    lower.includes(normalizeText(item))
  );
  if (amenities.length) criteria.amenities = amenities;

  if (lower.includes('furnished') || lower.includes('مفروشة')) {
    criteria.furnished = true;
  }

  return criteria;
}

function classifyIntent(
  query: string
): AIAnswerResult['intent'] {
  const lower = normalizeText(query);

  if (
    /compare|comparison|قارن|مقارنه/.test(lower)
  ) {
    return 'property_compare';
  }

  if (
    /market|yield|roi|return|investment|forecast|trend|سوق|عائد|استثمار|توقع/.test(lower)
  ) {
    return 'market_insight';
  }

  if (
    /contact|phone|email|location|office|working hours|whatsapp|رقم|تليفون|ايميل|عنوان|واتساب|مواعيد/.test(lower)
  ) {
    return 'site_faq';
  }

  if (
    /book|visit|tour|call me|contact me|interested|عايز احجز|عايز معاينه|كلمني|تواصل معي/.test(
      lower
    )
  ) {
    return 'lead_capture';
  }

  if (
    /villa|apartment|penthouse|townhouse|office|warehouse|land|شقه|فيلا|بنتهاوس|تاون هاوس|مكتب|ارض|عقار/.test(
      lower
    )
  ) {
    return 'property_search';
  }

  if (
    /mortgage|fees|transfer|registration|ejari|dld|bank|تمويل|رسوم|تحويل|تسجيل/.test(
      lower
    )
  ) {
    return 'general_real_estate';
  }

  return 'general_visitor';
}

/* -------------------------------------------------------------------------- */
/*                              SEARCH / RANKING                              */
/* -------------------------------------------------------------------------- */

function matchLocation(property: Property, location?: string): boolean {
  if (!location) return true;
  const hay = normalizeText(
    `${property.location} ${property.location_ar ?? ''} ${property.city ?? ''} ${property.community ?? ''}`
  );
  const needle = normalizeText(location);
  return hay.includes(needle);
}

function matchAmenities(property: Property, amenities?: string[]): boolean {
  if (!amenities?.length) return true;
  const hay = (property.amenities ?? []).map(normalizeText);
  return amenities.every((a) => hay.some((h) => h.includes(normalizeText(a))));
}

function filterAndRankProperties(
  properties: Property[],
  criteria: PropertySearchCriteria
): Property[] {
  const filtered = properties.filter((p) => {
    if (criteria.type && p.type !== criteria.type) return false;
    if (criteria.purpose && p.purpose !== criteria.purpose) return false;
    if (criteria.location && !matchLocation(p, criteria.location)) return false;
    if (criteria.minPrice != null && p.price < criteria.minPrice) return false;
    if (criteria.maxPrice != null && p.price > criteria.maxPrice) return false;
    if (criteria.bedrooms != null && p.bedrooms !== criteria.bedrooms) return false;
    if (criteria.minBedrooms != null && p.bedrooms < criteria.minBedrooms) return false;
    if (criteria.maxBedrooms != null && p.bedrooms > criteria.maxBedrooms) return false;
    if (criteria.minArea != null && p.area < criteria.minArea) return false;
    if (criteria.maxArea != null && p.area > criteria.maxArea) return false;
    if (criteria.furnished != null && p.furnished !== criteria.furnished) return false;
    if (!matchAmenities(p, criteria.amenities)) return false;
    return true;
  });

  return filtered
    .map((p) => ({
      ...p,
      ai_score: computePropertyScore(p, criteria),
    }))
    .sort((a, b) => (b.ai_score ?? 0) - (a.ai_score ?? 0));
}

function computePropertyScore(
  property: Property,
  criteria: PropertySearchCriteria
): number {
  let score = property.ai_score ?? 50;

  if (criteria.type && property.type === criteria.type) score += 20;
  if (criteria.purpose && property.purpose === criteria.purpose) score += 15;
  if (criteria.location && matchLocation(property, criteria.location)) score += 18;
  if (criteria.bedrooms != null && property.bedrooms === criteria.bedrooms) score += 12;

  if (criteria.minPrice != null || criteria.maxPrice != null) {
    const targetMin = criteria.minPrice ?? 0;
    const targetMax = criteria.maxPrice ?? Number.MAX_SAFE_INTEGER;
    if (property.price >= targetMin && property.price <= targetMax) {
      score += 16;
    }
  }

  if (criteria.amenities?.length) {
    const matched =
      criteria.amenities.filter((a) =>
        (property.amenities ?? []).some((x) => normalizeText(x).includes(normalizeText(a)))
      ).length ?? 0;
    score += matched * 2;
  }

  if (property.verified) score += 4;
  return Math.min(100, score);
}

async function searchAcrossPlatforms(
  criteria: PropertySearchCriteria
): Promise<Property[]> {
  const adapters = PLATFORM_ADAPTERS.filter((a) => a.enabled);

  const settled = await Promise.allSettled(
    adapters.map((adapter) => adapter.searchProperties(criteria))
  );

  const merged = settled.flatMap((result) =>
    result.status === 'fulfilled' ? result.value : []
  );

  const deduped = dedupeProperties(merged);
  return deduped;
}

function dedupeProperties(properties: Property[]): Property[] {
  const seen = new Map<string, Property>();

  for (const property of properties) {
    const key = normalizeText(
      `${property.title}|${property.location}|${property.price}|${property.type}`
    );
    const existing = seen.get(key);

    if (!existing) {
      seen.set(key, property);
      continue;
    }

    if ((property.ai_score ?? 0) > (existing.ai_score ?? 0)) {
      seen.set(key, property);
    }
  }

  return [...seen.values()];
}

/* -------------------------------------------------------------------------- */
/*                            PROPERTY SEARCH API                             */
/* -------------------------------------------------------------------------- */

export async function aiPropertySearch(query: string): Promise<Property[]> {
  const criteria = parsePropertyQuery(query);
  const results = await searchAcrossPlatforms(criteria);
  return filterAndRankProperties(results, criteria).slice(0, 8);
}

export async function getSimilarProperties(
  property: Property,
  limit = 4
): Promise<Property[]> {
  const settled = await Promise.allSettled(
    PLATFORM_ADAPTERS.filter((a) => a.enabled && a.getAllProperties).map((a) =>
      a.getAllProperties!()
    )
  );

  const all = settled.flatMap((result) =>
    result.status === 'fulfilled' ? result.value : []
  );

  return all
    .filter((p) => p.id !== property.id)
    .map((p) => {
      let score = 0;
      if (p.type === property.type) score += 4;
      if (normalizeText(p.location) === normalizeText(property.location)) score += 4;
      if (Math.abs(p.price - property.price) / Math.max(property.price, 1) < 0.3) score += 3;
      if (Math.abs((p.bedrooms ?? 0) - (property.bedrooms ?? 0)) <= 1) score += 2;
      score += (p.ai_score ?? 0) / 20;
      return { property: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.property);
}

export async function getPriceInsight(
  property: Property,
  language: 'en' | 'ar' = 'en'
): Promise<{
  prediction: string;
  confidence: number;
  trend: 'up' | 'stable' | 'down';
}> {
  const settled = await Promise.allSettled(
    PLATFORM_ADAPTERS.filter((a) => a.enabled && a.getMarketData).map((a) =>
      a.getMarketData!()
    )
  );

  const marketData = settled.flatMap((result) =>
    result.status === 'fulfilled' ? result.value : []
  );

  const regionData = marketData.find((m) => {
    const region = normalizeText(m.region);
    const location = normalizeText(property.location);
    return location.includes(region) || region.includes(location);
  });

  const priceChange = regionData?.priceChange ?? 6.5;
  const trend: 'up' | 'stable' | 'down' =
    priceChange > 9 ? 'up' : priceChange >= 4 ? 'stable' : 'down';
  const confidence = Math.min(95, Math.round(70 + Math.abs(priceChange)));

  if (language === 'ar') {
    const prediction =
      trend === 'up'
        ? `يتوقع الذكاء الاصطناعي نموًا سنويًا يقارب ${priceChange.toFixed(1)}% في هذه المنطقة`
        : trend === 'down'
        ? `يتوقع الذكاء الاصطناعي استقرارًا نسبيًا في سوق ${property.location}`
        : `يتوقع الذكاء الاصطناعي نموًا معتدلًا في ${property.location}`;

    return { prediction, confidence, trend };
  }

  const prediction =
    trend === 'up'
      ? `AI predicts around ${priceChange.toFixed(1)}% annual growth in this area`
      : trend === 'down'
      ? `AI suggests relatively stable conditions in ${property.location}`
      : `AI forecasts moderate appreciation in ${property.location}`;

  return { prediction, confidence, trend };
}

/* -------------------------------------------------------------------------- */
/*                          SITE FAQ / VISITOR ANSWERS                        */
/* -------------------------------------------------------------------------- */

const SITE_FAQ_EN: Array<{ test: RegExp; answer: string }> = [
  {
    test: /phone|call|number|contact/i,
    answer: `You can contact ${ENV.APP_NAME} on ${ENV.SITE_PHONE} or email ${ENV.SITE_EMAIL}.`,
  },
  {
    test: /email/i,
    answer: `You can email us at ${ENV.SITE_EMAIL}.`,
  },
  {
    test: /office|location|address/i,
    answer: `${ENV.APP_NAME} serves clients across Dubai and Abu Dhabi. Share your preferred area and I can help immediately.`,
  },
  {
    test: /payment|installment|mortgage|finance/i,
    answer:
      'We can help with direct purchase, installments, and financing guidance depending on the property and developer.',
  },
];

const SITE_FAQ_AR: Array<{ test: RegExp; answer: string }> = [
  {
    test: /رقم|اتصال|تليفون|هاتف/,
    answer: `يمكنك التواصل مع ${ENV.APP_NAME} على ${ENV.SITE_PHONE} أو عبر البريد ${ENV.SITE_EMAIL}.`,
  },
  {
    test: /ايميل|بريد/,
    answer: `يمكنك مراسلتنا على ${ENV.SITE_EMAIL}.`,
  },
  {
    test: /عنوان|مكتب|موقع/,
    answer: `${ENV.APP_NAME} يخدم العملاء في دبي وأبو ظبي. اكتب لي المنطقة المطلوبة وسأساعدك فورًا.`,
  },
  {
    test: /تمويل|قسط|اقساط|دفع|رهن/,
    answer:
      'نستطيع مساعدتك في الشراء المباشر أو التقسيط أو التوجيه التمويلي حسب العقار والمطور.',
  },
];

function answerSiteFaq(
  query: string,
  language: 'en' | 'ar'
): string | null {
  const bank = language === 'ar' ? SITE_FAQ_AR : SITE_FAQ_EN;
  const found = bank.find((item) => item.test.test(query));
  return found?.answer ?? null;
}

/* -------------------------------------------------------------------------- */
/*                          OPENAI GENERAL AI ANSWER                          */
/* -------------------------------------------------------------------------- */

/**
 * OpenAI now recommends Responses API for new projects, while Chat Completions
 * remains available. This function supports both. :contentReference[oaicite:1]{index=1}
 */
export async function aiAnswer(
  query: string,
  options?: {
    context?: SearchContext;
    properties?: Property[];
    marketData?: MarketData[];
  }
): Promise<string> {
  const apiKey = ENV.OPENAI_API_KEY;
  if (!apiKey) {
    return fallbackGeneralAnswer(query, options?.context?.language ?? detectLanguage(query));
  }

  const language = options?.context?.language ?? detectLanguage(query);
  const siteContext =
    language === 'ar'
      ? `اسم الشركة: ${options?.context?.companyName ?? ENV.APP_NAME}
رقم الهاتف: ${ENV.SITE_PHONE}
البريد الإلكتروني: ${ENV.SITE_EMAIL}
مهمتك: الرد على أي استفسار من زوار موقع عقاري بشكل مهني ومختصر ومقنع.
إذا كان السؤال عن عقار، استخدم البيانات المرسلة.
إذا لم تتأكد من معلومة، كن صريحًا واطلب تفاصيل إضافية.
إذا كان الزائر مهتمًا بالشراء أو الإيجار، شجعه على ترك وسيلة تواصل.`
      : `Company: ${options?.context?.companyName ?? ENV.APP_NAME}
Phone: ${ENV.SITE_PHONE}
Email: ${ENV.SITE_EMAIL}
Task: Answer any visitor question on a real estate website professionally, briefly, and helpfully.
If the question is about properties, use the provided property data.
If uncertain, say so clearly and ask for more specifics.
If the visitor shows buying or renting intent, encourage them to leave contact details.`;

  const propertyContext =
    options?.properties?.length
      ? JSON.stringify(
          options.properties.map((p) => ({
            id: p.id,
            title: p.title,
            location: p.location,
            city: p.city,
            price: p.price,
            currency: p.currency,
            bedrooms: p.bedrooms,
            type: p.type,
            purpose: p.purpose,
            amenities: p.amenities,
          }))
        )
      : '[]';

  const marketContext =
    options?.marketData?.length ? JSON.stringify(options.marketData) : '[]';

  const userPrompt =
    language === 'ar'
      ? `سؤال الزائر: ${query}

العقارات المتاحة:
${propertyContext}

بيانات السوق:
${marketContext}

أجب بالعربية إذا كان السؤال بالعربية، وكن مفيدًا ومباشرًا.`
      : `Visitor question: ${query}

Available properties:
${propertyContext}

Market data:
${marketContext}

Answer in the same language as the visitor when possible.`;

  try {
    if (ENV.USE_RESPONSES_API) {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: ENV.OPENAI_MODEL,
          input: [
            { role: 'system', content: siteContext },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.4,
        }),
      });

      if (!response.ok) {
        return fallbackGeneralAnswer(query, language);
      }

      const data = await response.json();
      return (
        data?.output_text ||
        data?.output?.[0]?.content?.[0]?.text ||
        fallbackGeneralAnswer(query, language)
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: ENV.OPENAI_MODEL,
        messages: [
          { role: 'system', content: siteContext },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      return fallbackGeneralAnswer(query, language);
    }

    const data = await response.json();
    return (
      data?.choices?.[0]?.message?.content || fallbackGeneralAnswer(query, language)
    );
  } catch {
    return fallbackGeneralAnswer(query, language);
  }
}

function fallbackGeneralAnswer(
  query: string,
  language: 'en' | 'ar'
): string {
  const lower = normalizeText(query);

  if (language === 'ar') {
    if (/سعر|كم|تكلفه|تكلف/.test(lower)) {
      return 'يمكنني مساعدتك في معرفة الأسعار المناسبة، فقط اكتب نوع العقار والمنطقة والميزانية.';
    }
    if (/ايجار|للايجار|إيجار/.test(lower)) {
      return 'أخبرني بالمنطقة وعدد الغرف والميزانية وسأرشح لك أفضل الخيارات للإيجار.';
    }
    if (/شراء|للبيع|استثمار/.test(lower)) {
      return 'أخبرني بالمنطقة والميزانية ونوع العقار، وسأساعدك في أفضل الخيارات للشراء أو الاستثمار.';
    }
    return 'يسعدني مساعدتك في أي استفسار عن العقارات أو المناطق أو الأسعار أو الاستثمار أو إجراءات الشراء والإيجار. اكتب سؤالك بالتفصيل.';
  }

  if (/price|cost|budget/.test(lower)) {
    return 'I can help with pricing. Tell me the property type, location, and budget.';
  }
  if (/rent|rental/.test(lower)) {
    return 'Tell me the area, number of bedrooms, and your budget and I will suggest suitable rental options.';
  }
  if (/buy|purchase|investment/.test(lower)) {
    return 'Tell me the location, budget, and property type and I will suggest strong buying or investment options.';
  }
  return 'I can help with any question about properties, areas, prices, investment, buying, renting, and website information. Ask me in detail.';
}

/* -------------------------------------------------------------------------- */
/*                             MAIN ENTRY POINT                               */
/* -------------------------------------------------------------------------- */

export async function answerVisitorQuery(
  query: string,
  context?: SearchContext
): Promise<AIAnswerResult> {
  const language = context?.language ?? detectLanguage(query);
  const intent = classifyIntent(query);

  if (intent === 'site_faq') {
    const faq = answerSiteFaq(query, language);
    if (faq) {
      return {
        answer: faq,
        intent,
        leadSuggested: true,
      };
    }
  }

  if (intent === 'property_search' || intent === 'property_compare') {
    const properties = await aiPropertySearch(query);

    if (properties.length > 0) {
      const answer =
        language === 'ar'
          ? `وجدت ${properties.length} عقارًا مناسبًا لطلبك. يمكنك تصفح النتائج الآن، وإذا أردت سأقوم بتضييق البحث حسب المنطقة أو الميزانية أو عدد الغرف.`
          : `I found ${properties.length} properties that match your request. You can review the results now, and I can narrow them further by area, budget, or bedrooms.`;

      return {
        answer,
        properties,
        intent,
        leadSuggested: true,
      };
    }

    const aiFallback = await aiAnswer(query, { context });
    return {
      answer: aiFallback,
      intent,
      leadSuggested: true,
    };
  }

  if (intent === 'market_insight') {
    const marketData = await getAllMarketData();
    const aiText = await aiAnswer(query, { context, marketData });
    return {
      answer: aiText,
      intent,
      leadSuggested: true,
    };
  }

  if (intent === 'lead_capture') {
    return {
      answer:
        language === 'ar'
          ? `ممتاز، يسعدنا مساعدتك. أرسل اسمك ورقم هاتفك والمنطقة أو نوع العقار المطلوب وسيتواصل معك فريق ${ENV.APP_NAME} بسرعة.`
          : `Great. We’d be happy to help. Please share your name, phone number, and preferred area or property type, and the ${ENV.APP_NAME} team will contact you shortly.`,
      intent,
      leadSuggested: true,
    };
  }

  const generic = await aiAnswer(query, { context });
  return {
    answer: generic,
    intent,
    leadSuggested: false,
  };
}

/* -------------------------------------------------------------------------- */
/*                              MARKET HELPERS                                */
/* -------------------------------------------------------------------------- */

async function getAllMarketData(): Promise<MarketData[]> {
  const settled = await Promise.allSettled(
    PLATFORM_ADAPTERS.filter((a) => a.enabled && a.getMarketData).map((a) =>
      a.getMarketData!()
    )
  );

  return settled.flatMap((result) =>
    result.status === 'fulfilled' ? result.value : []
  );
}