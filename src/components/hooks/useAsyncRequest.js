import { useState } from 'react';

export function useAsyncRequest() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const fetchData = async (requestFunction, ...args) => {
    try {
      setLoading(true);
      const responseData = await requestFunction(...args);
      setData(responseData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, data, setError, fetchData };
}
