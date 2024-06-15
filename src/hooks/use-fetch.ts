import { useState, useEffect } from "react";

const useFetch = <D>(url: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const [data, setData] = useState<D | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await fetch(`${BASE_URL}${url}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
        setIsLoading(false);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError, isSuccess };
};

export default useFetch;
