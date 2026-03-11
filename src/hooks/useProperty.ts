import { useState, useEffect } from 'react';
import { propertyAPI, Property } from '../services/api';

export function useProperty(id: string | undefined) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setLoading(false);
        setError('Property ID is required');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await propertyAPI.getPropertyById(id);
        setProperty(data);
        if (!data) {
          setError('Property not found');
        }
      } catch (err) {
        setError('Property not found');
        setProperty(null);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading, error };
}
