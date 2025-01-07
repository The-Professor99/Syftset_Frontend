import { useEffect, useState } from "react";

interface UseRemoteServiceOptions<T> {
  url: string;
  initialData: T;
  dependencies?: any[]; // Dependencies to trigger re-fetching
  shouldFetch?: boolean; // Flag to toggle fetching
}

interface UseRemoteServiceReturn<T> {
  data: T;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

export const useRemoteService = <T>({
  url,
  initialData,
  dependencies = [],
  shouldFetch = true,
}: UseRemoteServiceOptions<T>): UseRemoteServiceReturn<T> => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldFetch) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      setErrorMessage(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        console.log(response);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const result = await response.json();
        setData(result.data as T);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(true);
          setErrorMessage(err.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Clean up any ongoing requests
    };
  }, [url, shouldFetch, ...dependencies]);

  return { data, loading, error, errorMessage };
};
