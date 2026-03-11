import { describe, it, expect } from 'vitest';
import { propertyAPI, marketAPI } from './api';

describe('propertyAPI', () => {
  it('getAllProperties returns array of properties', async () => {
    const properties = await propertyAPI.getAllProperties();

    expect(Array.isArray(properties)).toBe(true);
    expect(properties.length).toBeGreaterThan(0);

    const first = properties[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('title');
    expect(first).toHaveProperty('location');
    expect(first).toHaveProperty('price');
    expect(first).toHaveProperty('type');
    expect(first).toHaveProperty('images');
  });

  it('getPropertyById returns property when found', async () => {
    const properties = await propertyAPI.getAllProperties();
    const firstId = properties[0].id;

    const property = await propertyAPI.getPropertyById(firstId);

    expect(property).not.toBeNull();
    expect(property?.id).toBe(firstId);
  });

  it('getPropertyById returns null for invalid id', async () => {
    const property = await propertyAPI.getPropertyById('non-existent-id-12345');

    expect(property).toBeNull();
  });

  it('searchProperties filters by location', async () => {
    const results = await propertyAPI.searchProperties({
      location: 'Dubai',
    });

    expect(Array.isArray(results)).toBe(true);
    results.forEach((p) => {
      expect(p.location.toLowerCase()).toContain('dubai');
    });
  });

  it('searchProperties filters by type', async () => {
    const results = await propertyAPI.searchProperties({
      type: 'villa',
    });

    expect(Array.isArray(results)).toBe(true);
    results.forEach((p) => {
      expect(p.type).toBe('villa');
    });
  });

  it('searchProperties filters by price range', async () => {
    const results = await propertyAPI.searchProperties({
      minPrice: 500_000,
      maxPrice: 1_500_000,
    });

    expect(Array.isArray(results)).toBe(true);
    results.forEach((p) => {
      expect(p.price).toBeGreaterThanOrEqual(500_000);
      expect(p.price).toBeLessThanOrEqual(1_500_000);
    });
  });

  it('getFeaturedProperties returns limited results sorted by ai_score', async () => {
    const properties = await propertyAPI.getFeaturedProperties(3);

    expect(properties).toHaveLength(3);
    for (let i = 1; i < properties.length; i++) {
      expect(properties[i].ai_score).toBeLessThanOrEqual(
        properties[i - 1].ai_score
      );
    }
  });
});

describe('marketAPI', () => {
  it('getMarketData returns array of market data', async () => {
    const data = await marketAPI.getMarketData();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    const first = data[0];
    expect(first).toHaveProperty('region');
    expect(first).toHaveProperty('avgPrice');
    expect(first).toHaveProperty('priceChange');
    expect(first).toHaveProperty('totalListings');
  });

  it('getMarketDataByRegion returns data when region exists', async () => {
    const data = await marketAPI.getMarketDataByRegion('Dubai Marina');

    expect(data).not.toBeNull();
    expect(data?.region).toBe('Dubai Marina');
  });

  it('getMarketDataByRegion returns null for unknown region', async () => {
    const data = await marketAPI.getMarketDataByRegion('Unknown Region XYZ');

    expect(data).toBeNull();
  });
});
