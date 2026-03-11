// Mock API service for properties and data
import { studioApartments } from '../data/studios';
import { luxuryVillas } from '../data/villas';
import { luxuryPenthouses } from '../data/penthouses';
import { luxuryTownhouses } from '../data/townhouses';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  areaUnit: string;
  type: 'villa' | 'apartment' | 'penthouse' | 'townhouse';
  image: string;
  images: string[];
  description: string;
  features: string[];
  blockchain_verified: boolean;
  ai_score: number;
  available: boolean;
}

export interface MarketData {
  region: string;
  avgPrice: number;
  priceChange: number;
  totalListings: number;
}

// Mock Properties Data - Single source from data files (no duplicate IDs)
const mockProperties: Property[] = [
  ...studioApartments,
  ...luxuryVillas,
  ...luxuryPenthouses,
  ...luxuryTownhouses,
];

// Mock Market Data
const mockMarketData: MarketData[] = [
  { region: 'Downtown Dubai', avgPrice: 2100000, priceChange: 12.5, totalListings: 1250 },
  { region: 'Dubai Marina', avgPrice: 1850000, priceChange: 8.3, totalListings: 2100 },
  { region: 'Palm Jumeirah', avgPrice: 5200000, priceChange: 15.2, totalListings: 450 },
  { region: 'Business Bay', avgPrice: 1650000, priceChange: 10.1, totalListings: 1800 },
  { region: 'Arabian Ranches', avgPrice: 3100000, priceChange: 6.7, totalListings: 890 },
  { region: 'JBR', avgPrice: 2400000, priceChange: 9.8, totalListings: 1560 },
];

// API Functions with simulated delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const propertyAPI = {
  // Get all properties
  getAllProperties: async (): Promise<Property[]> => {
    await delay(500);
    return mockProperties;
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property | null> => {
    await delay(300);
    return mockProperties.find(p => p.id === id) || null;
  },

  // Search properties
  searchProperties: async (query: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
  }): Promise<Property[]> => {
    await delay(600);
    
    let filtered = [...mockProperties];
    
    if (query.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(query.location!.toLowerCase())
      );
    }
    
    if (query.type) {
      filtered = filtered.filter(p => p.type === query.type);
    }
    
    if (query.minPrice) {
      filtered = filtered.filter(p => p.price >= query.minPrice!);
    }
    
    if (query.maxPrice) {
      filtered = filtered.filter(p => p.price <= query.maxPrice!);
    }
    
    if (query.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= query.bedrooms!);
    }
    
    return filtered;
  },

  // Get featured properties
  getFeaturedProperties: async (limit: number = 3): Promise<Property[]> => {
    await delay(400);
    return mockProperties
      .sort((a, b) => b.ai_score - a.ai_score)
      .slice(0, limit);
  },
};

export const marketAPI = {
  // Get market data
  getMarketData: async (): Promise<MarketData[]> => {
    await delay(500);
    return mockMarketData;
  },

  // Get market data by region
  getMarketDataByRegion: async (region: string): Promise<MarketData | null> => {
    await delay(300);
    return mockMarketData.find(m => 
      m.region.toLowerCase() === region.toLowerCase()
    ) || null;
  },
};
