import { useState } from 'react';

export function useAsyncRequest() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  const fetchData = async (requestFunction, value) => {
    try {
      setLoading(true);
      const responseData = await requestFunction(value);
      setData(responseData);
    } catch (error) {
      throw new Error(error)
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, data, setError, fetchData };
}
