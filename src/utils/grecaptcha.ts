import { G_SITE_KEY } from "../constants";

interface Recaptcha {
    ready: (callback: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
    interface Window {
        grecaptcha: Recaptcha;
    }
}

const SCRIPT_URL = `https://www.google.com/recaptcha/api.js?render=${G_SITE_KEY}`;

let grecaptchaPromise: Promise<Recaptcha> | null = null;

/**
 * Loads the reCAPTCHA script dynamically and returns a promise that resolves to the grecaptcha object.
 * Ensures the script is loaded only once.
 */
const loadRecaptchaScript = (): Promise<Recaptcha> => {
    if (grecaptchaPromise) {
        // Return cached promise if script is already loading or loaded
        return grecaptchaPromise;
    }

    grecaptchaPromise = new Promise((resolve, reject) => {
        if (typeof window.grecaptcha !== "undefined") {
            // Script already loaded
            resolve(window.grecaptcha);
            return;
        }

        const script = document.createElement("script");
        script.src = SCRIPT_URL;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (typeof window.grecaptcha !== "undefined") {
                resolve(window.grecaptcha);
                console.log("reCAPTCHA script loaded successfully");
            } else {
                reject(new Error("reCAPTCHA script loaded but grecaptcha is undefined"));
            }
        };

        script.onerror = () => {
            reject(new Error("Failed to load reCAPTCHA script"));
        };

        document.head.appendChild(script);
    });

    return grecaptchaPromise;
};

/**
 * Utility object for reCAPTCHA operations.
 */
const grecaptcha = {
    /**
     * Waits for reCAPTCHA to be ready and executes the callback.
     * @param callback Function to execute when reCAPTCHA is ready.
     */
    ready: async (callback: () => void): Promise<void> => {
        const grecaptcha = await loadRecaptchaScript();
        grecaptcha.ready(callback);
    },

    /**
     * Executes reCAPTCHA with the specified action and returns a token.
     * @param action The action name for reCAPTCHA (e.g., 'submit_form').
     * @returns Promise resolving to the reCAPTCHA token.
     */
    execute: async (action: string): Promise<string> => {
        const grecaptcha = await loadRecaptchaScript();
        return grecaptcha.execute(G_SITE_KEY, { action });
    },
};

// Ensure reCAPTCHA is ready on initial load
grecaptcha.ready(() => { })

export default grecaptcha;