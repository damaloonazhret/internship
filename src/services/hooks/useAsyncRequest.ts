import { useCallback, useState } from "react";
import { GithubData } from "../../components/Main/Main";

interface UseAsyncRequestResult {
  isLoading: boolean;
  error: Error | null | string;
  data: GithubData;
  setError: (error: Error | null | string) => void;
  fetchData: (
      requestFunction: (value: string) => Promise<GithubData>,
      value: string,
  ) => Promise<void>;
}

export const useAsyncRequest = (): UseAsyncRequestResult => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | string>(null);
  const [data, setData] = useState<GithubData>();

  const fetchData = useCallback(
      async (requestFunction: (value: string) => Promise<GithubData>, value: string) => {
        try {
          setLoading(true);
          const responseData = await requestFunction(value);
          setData(responseData);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      },
      [],
  );

  return {isLoading, error, data, setError, fetchData} as UseAsyncRequestResult;
};
