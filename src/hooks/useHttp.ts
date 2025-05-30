import { useEffect, useState } from "react";
import { HookConfig } from "../types/hook.type";

const cacheHttpRequest = new Map<string, any>();

function useHttp() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const controller = new AbortController();

  const sendRequest = async (
    config: HookConfig,
    onSuccess?: (data: any) => void
  ) => {
    const keyRequest = JSON.stringify(config);
    if (config.cache && cacheHttpRequest.has(keyRequest)) {
      const cachedResponse = cacheHttpRequest.get(keyRequest);
      if (cachedResponse) {
        setIsLoading(false);
        setError(null);
        onSuccess?.(cachedResponse);
        return
      }
    }
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(config.url, {
        signal: controller.signal,
        method: config.method ? config.method : "GET",
        headers: config.headers
          ? config.headers
          : {
            "Content-Type": "application/json",
            Accept: "application/json, image/*",
            Bearer: localStorage.getItem("sessionToken") || "",
          },
        body: config.body ? config.body : null,
        credentials: "include",
      });
      const data = await response.json();

      if (response.status >= 200 && response.status < 300) {
        if (onSuccess) {
          onSuccess(data);
          if (config.cache){
            cacheHttpRequest.set(keyRequest, data);
          }
        }
      } else {
        setError(data.message);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelRequest = () => {
    controller.abort();
    setIsLoading(false);
  };

  useEffect(() => {
    setTimeout(() => {
      controller.abort();
      setIsLoading(false);
    }, 15000);
  }, [])

  return {
    error,
    setError,
    isLoading,
    sendRequest,
    cancelRequest,
  };
}

export default useHttp;
