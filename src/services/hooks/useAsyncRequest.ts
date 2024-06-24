import { useCallback, useState } from "react";

type NoArgRequestFunction<T> = () => Promise<T>;
type ArgRequestFunction<T> = (value: string) => Promise<T>;

export type RequestFunction<T> = {
  (requestFunction: NoArgRequestFunction<T>): Promise<void>;
  (requestFunction: ArgRequestFunction<T>, value: string): Promise<void>;
};

interface UseAsyncRequestResult<T> {
  isLoading: boolean;
  error: Error | null | string;
  data: T | null;
  setError: (error: Error | null | string) => void;
  fetchData: RequestFunction<T>;
}

export const useAsyncRequest = <T>(): UseAsyncRequestResult<T> => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [data, setData] = useState<T | null>(null);

  const fetchData: RequestFunction<T> = useCallback(
    async (requestFunction, value?: string) => {
      try {
        setLoading(true);
        let responseData: T;
        if (value !== undefined) {
          responseData = await (requestFunction as ArgRequestFunction<T>)(
            value,
          );
        } else {
          responseData = await (requestFunction as NoArgRequestFunction<T>)();
        }
        setData(responseData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    isLoading,
    error,
    data,
    setError,
    fetchData,
  };
};
