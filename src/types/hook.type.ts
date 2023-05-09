export type HookConfig = {
    url: RequestInfo | URL;
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit;
}