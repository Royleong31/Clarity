// src/hooks/useAxios.ts
import { useEffect, useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useAxios = <T,>(
  url: string,
  config?: AxiosRequestConfig
): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!url) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios(url, config);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [url, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useAxios;
