import { BackoffOptions } from 'exponential-backoff';
import { RateLimiter, RateLimiterOpts } from 'limiter';
/**
 * Error thrown when the CoW Protocol OrderBook API returns an error.
 */
export declare class OrderBookApiError<T = unknown> extends Error {
    readonly response: Response;
    readonly body: T;
    /**
     * Error thrown when the CoW Protocol OrderBook API returns an error.
     * @param response The response from the CoW Protocol OrderBook API.
     * @param body The body of the response.
     * @constructor
     */
    constructor(response: Response, body: T);
}
/**
 * The default backoff options for CoW Protocol's API
 * @see {@link Backoff configuration: https://www.npmjs.com/package/@insertish/exponential-backoff}
 */
export declare const DEFAULT_BACKOFF_OPTIONS: BackoffOptions;
/**
 * The default rate limiter options for CoW Protocol's API.
 *
 * **CAUTION**: The CoW Protocol OrderBook API is limited to 5 requests per second per IP.
 */
export declare const DEFAULT_LIMITER_OPTIONS: RateLimiterOpts;
/**
 * Describe the parameters for a fetch request.
 */
export interface FetchParams {
    path: string;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT';
    body?: unknown;
    query?: URLSearchParams;
}
/**
 * Helper function to make a rate-limited request to an API.
 * @param baseUrl The base URL of the API.
 * @param path The path of the request.
 * @param query The query parameters of the request.
 * @param method The HTTP method of the request.
 * @param body The body of the request.
 * @param rateLimiter The rate limiter to use.
 * @param backoffOpts The backoff options to use.
 * @returns The response of the request.
 * @throws If the API returns an error or if the request fails.
 */
export declare function request<T>(baseUrl: string, { path, query, method, body }: FetchParams, rateLimiter: RateLimiter, backoffOpts: BackoffOptions): Promise<T>;
