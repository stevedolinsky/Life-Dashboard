import { useState, useEffect, useCallback } from 'react';

export function useWidgetData(widgetType, refreshInterval = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/data/${widgetType}`);
      if (!response.ok) {
        if (response.status === 404) {
          setData(null);
          return;
        }
        throw new Error(`Failed to fetch ${widgetType} data`);
      }
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [widgetType]);

  useEffect(() => {
    fetchData();

    if (refreshInterval) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}
