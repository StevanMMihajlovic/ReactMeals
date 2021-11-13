import { useState, useCallback } from "react";

const useHttp = (requestConfig, applyData) => {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const getMeals = useCallback(async () => {
    setLoad(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();

      applyData(data);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
    setLoad(false);
  }, [requestConfig, applyData]);

  return {
    load,
    error,
    getMeals,
  };
};

export default useHttp;
