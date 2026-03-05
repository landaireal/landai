import { useState, useEffect } from 'react';
import { propertyAPI, Property } from '../services/api';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await propertyAPI.getAllProperties();
        setProperties(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
}

export function useFeaturedProperties(limit: number = 3) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data = await propertyAPI.getFeaturedProperties(limit);
        setProperties(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [limit]);

  return { properties, loading, error };
}

export function usePropertySearch() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: {
    location?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
  }) => {
    try {
      setLoading(true);
      const data = await propertyAPI.searchProperties(query);
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Failed to search properties');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { properties, loading, error, search };
}
