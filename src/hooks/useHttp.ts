import { useState } from "react";
import { HookConfig } from "../types/hook.type";

function useHttp() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const controller = new AbortController();

    const sendRequest = async (config: HookConfig, onSuccess?: (data: any) => void) => {
        try {
            setIsLoading(true);
            setError(null);
            const respone = await fetch(config.url, {
                signal: controller.signal,
                method: config.method ? config.method : "GET",
                headers: config.headers
                    ? config.headers
                    : {
                        "Content-Type": "application/json",
                        Accept: "application/json, image/*",
                    },
                body: config.body ? config.body : null,
                credentials: "include",
            });
            const data = await respone.json();

            if (respone.status >= 200 && respone.status < 300) {
                if (onSuccess) {
                    onSuccess(data);
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

    return {
        error,
        setError,
        isLoading,
        sendRequest,
    };
}

export default useHttp;
