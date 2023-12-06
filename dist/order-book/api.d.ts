import 'cross-fetch/polyfill';
import { Address, AppDataHash, AppDataObject, NativePriceResponse, OrderCancellations, OrderCreation, OrderQuoteRequest, OrderQuoteResponse, SolverCompetitionResponse, TotalSurplus, Trade, TransactionHash, UID } from './generated';
import { ApiBaseUrls, ApiContext, PartialApiContext, RequestOptions } from '../common/configs';
import { EnrichedOrder } from './types';
/**
 * An object containing *production* environment base URLs for each supported `chainId`.
 * @see {@link https://api.cow.fi/docs/#/}
 */
export declare const ORDER_BOOK_PROD_CONFIG: ApiBaseUrls;
/**
 * An object containing *staging* environment base URLs for each supported `chainId`.
 */
export declare const ORDER_BOOK_STAGING_CONFIG: ApiBaseUrls;
/**
 * The parameters for the `getOrders` request.
 */
export type GetOrdersRequest = {
    owner: Address;
    offset?: number;
    limit?: number;
};
/**
 * The CoW Protocol OrderBook API client.
 *
 * This is the main entry point for interacting with the CoW Protocol OrderBook API. The main advantage of using
 * this client is the batteries-included approach to interacting with the API. It handles:
 *
 * - Environment configuration (mainnet, staging, etc.)
 * - Rate limiting
 * - Retries
 * - Backoff
 * - Error handling
 * - Request signing
 * - Request validation
 *
 * @example
 *
 * ```typescript
 * import { OrderBookApi, OrderSigningUtils, SupportedChainId } from '@cowprotocol/cow-sdk'
 * import { Web3Provider } from '@ethersproject/providers'
 *
 * const account = 'YOUR_WALLET_ADDRESS'
 * const chainId = 5 // Goerli
 * const provider = new Web3Provider(window.ethereum)
 * const signer = provider.getSigner()
 *
 * const quoteRequest = {
 *   sellToken: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // WETH goerli
 *   buyToken: '0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532', // GNO goerli
 *   from: account,
 *   receiver: account,
 *   sellAmountBeforeFee: (0.4 * 10 ** 18).toString(), // 0.4 WETH
 *   kind: OrderQuoteSide.kind.SELL,
 * }
 *
 * const orderBookApi = new OrderBookApi({ chainId: SupportedChainId.GOERLI })
 *
 * async function main() {
 *     const { quote } = await orderBookApi.getQuote(quoteRequest)
 *
 *     const orderSigningResult = await OrderSigningUtils.signOrder(quote, chainId, signer)
 *
 *     const orderId = await orderBookApi.sendOrder({ ...quote, ...orderSigningResult })
 *
 *     const order = await orderBookApi.getOrder(orderId)
 *
 *     const trades = await orderBookApi.getTrades({ orderId })
 *
 *     const orderCancellationSigningResult = await OrderSigningUtils.signOrderCancellations([orderId], chainId, signer)
 *
 *     const cancellationResult = await orderBookApi.sendSignedOrderCancellations({...orderCancellationSigningResult, orderUids: [orderId] })
 *
 *     console.log('Results: ', { orderId, order, trades, orderCancellationSigningResult, cancellationResult })
 * }
 * ```
 *
 * @see {@link Swagger documentation https://api.cow.fi/docs/#/}
 * @see {@link OrderBook API https://github.com/cowprotocol/services}
 */
export declare class OrderBookApi {
    context: ApiContext & RequestOptions;
    private rateLimiter;
    /**
     * Creates a new instance of the CoW Protocol OrderBook API client.
     * @param context - The API context to use. If not provided, the default context will be used.
     */
    constructor(context?: PartialApiContext & RequestOptions);
    /**
     * Get the version of the API.
     * @param contextOverride Optional context override for this request.
     * @returns The version of the API.
     * @see {@link https://api.cow.fi/docs/#/default/get_api_v1_version}
     */
    getVersion(contextOverride?: PartialApiContext): Promise<string>;
    /**
     * Get all the trades for either an `owner` **OR** `orderUid`.
     *
     * Given that an order *may* be partially fillable, it is possible that a discrete order (`orderUid`)
     * may have *multiple* trades. Therefore, this method returns a list of trades, either for *all* the orders
     * of a given `owner`, or for a discrete order (`orderUid`).
     * @param request Either an `owner` or an `orderUid` **MUST** be specified.
     * @param contextOverride Optional context override for this request.
     * @returns A list of trades matching the request.
     */
    getTrades(request: {
        owner?: Address;
        orderUid?: UID;
    }, contextOverride?: PartialApiContext): Promise<Array<Trade>>;
    /**
     * Get a list of orders for a given `owner`.
     * @param request The request parameters with `request.offset = 0` and `request.limit = 1000` by default.
     * @param contextOverride Optional context override for this request.
     * @returns A list of orders matching the request.
     * @see {@link GetOrdersRequest}
     * @see {@link EnrichedOrder}
     */
    getOrders({ owner, offset, limit }: GetOrdersRequest, contextOverride?: PartialApiContext): Promise<Array<EnrichedOrder>>;
    /**
     * Get a list of orders from a given settlement transaction hash.
     * @param txHash The transaction hash.
     * @param contextOverride Optional context override for this request.
     * @returns A list of orders matching the request.
     * @see {@link EnrichedOrder}
     */
    getTxOrders(txHash: TransactionHash, contextOverride?: PartialApiContext): Promise<Array<EnrichedOrder>>;
    /**
     * Get an order by its unique identifier, `orderUid`.
     * @param orderUid The unique identifier of the order.
     * @param contextOverride Optional context override for this request.
     * @returns The order matching the request.
     */
    getOrder(orderUid: UID, contextOverride?: PartialApiContext): Promise<EnrichedOrder>;
    /**
     * Attempt to get an order by its unique identifier, `orderUid`, from multiple environments.
     *
     * **NOTE**: The environment refers to either `prod` or `staging`. This allows a conveience method to
     * attempt to get an order from both environments, in the event that the order is not found in the
     * environment specified in the context.
     * @param orderUid The unique identifier of the order.
     * @param contextOverride Optional context override for this request.
     * @returns The order matching the request.
     * @throws {OrderBookApiError} If the order is not found in any of the environments.
     */
    getOrderMultiEnv(orderUid: UID, contextOverride?: PartialApiContext): Promise<EnrichedOrder>;
    /**
     * Get a quote for an order.
     * This allows for the calculation of the total cost of an order, including fees, before signing and submitting.
     * @param requestBody The parameters for the order quote request.
     * @param contextOverride Optional context override for this request.
     * @returns A hydrated order matching the request ready to be signed.
     */
    getQuote(requestBody: OrderQuoteRequest, contextOverride?: PartialApiContext): Promise<OrderQuoteResponse>;
    /**
     * Cancel one or more orders.
     *
     * **NOTE**: Cancellation is on a best-effort basis. Orders that are already in the process of being settled
     * (ie. transaction has been submitted to chain by the solver) cannot not be cancelled.
     * **CAUTION**: This method can only be used to cancel orders that were signed using `EIP-712` or `eth_sign (EIP-191)`.
     * @param requestBody Orders to be cancelled and signed instructions to cancel them.
     * @param contextOverride Optional context override for this request.
     * @returns A list of order unique identifiers that were successfully cancelled.
     */
    sendSignedOrderCancellations(requestBody: OrderCancellations, contextOverride?: PartialApiContext): Promise<void>;
    /**
     * Submit an order to the order book.
     * @param requestBody The signed order to be submitted.
     * @param contextOverride Optional context override for this request.
     * @returns The unique identifier of the order.
     */
    sendOrder(requestBody: OrderCreation, contextOverride?: PartialApiContext): Promise<UID>;
    /**
     * Get the native price of a token.
     *
     * **NOTE**: The native price is the price of the token in the native currency of the chain. For example, on Ethereum
     * this would be the price of the token in ETH.
     * @param tokenAddress The address of the ERC-20 token.
     * @param contextOverride Optional context override for this request.
     * @returns The native price of the token.
     */
    getNativePrice(tokenAddress: Address, contextOverride?: PartialApiContext): Promise<NativePriceResponse>;
    /**
     * Given a user's address, get the total surplus that they have earned.
     * @param address The user's address
     * @param contextOverride Optional context override for this request.
     * @returns Calculated user's surplus
     */
    getTotalSurplus(address: Address, contextOverride?: PartialApiContext): Promise<TotalSurplus>;
    /**
     * Retrieve the full app data for a given app data hash.
     * @param appDataHash `bytes32` hash of the app data
     * @param contextOverride Optional context override for this request.
     * @returns Full app data that was uploaded
     */
    getAppData(appDataHash: AppDataHash, contextOverride?: PartialApiContext): Promise<AppDataObject>;
    /**
     * Upload the full app data that corresponds to a given app data hash.
     * @param appDataHash `bytes32` hash of the app data
     * @param fullAppData Full app data to be uploaded
     * @param contextOverride Optional context override for this request.
     * @returns The string encoding of the full app data that was uploaded.
     */
    uploadAppData(appDataHash: AppDataHash, fullAppData: string, contextOverride?: PartialApiContext): Promise<AppDataObject>;
    getSolverCompetition(auctionId: number, contextOverride?: PartialApiContext): Promise<SolverCompetitionResponse>;
    getSolverCompetition(txHash: string, contextOverride?: PartialApiContext): Promise<SolverCompetitionResponse>;
    /**
     * Generate an API endpoint for an order by its unique identifier, `orderUid`.
     * @param orderUid The unique identifier of the order.
     * @param contextOverride Optional context override for this request.
     * @returns The API endpoint to get the order.
     */
    getOrderLink(orderUid: UID, contextOverride?: PartialApiContext): string;
    /**
     * Apply an override to the context for a request.
     * @param contextOverride Optional context override for this request.
     * @returns New context with the override applied.
     */
    private getContextWithOverride;
    /**
     * Get the base URLs for the API endpoints given the environment.
     * @param env The environment to get the base URLs for.
     * @returns The base URLs for the API endpoints.
     */
    private getApiBaseUrls;
    /**
     * Make a request to the API.
     * @param params The parameters for the request.
     * @param contextOverride Optional context override for this request.
     * @returns The response from the API.
     */
    private fetch;
}
