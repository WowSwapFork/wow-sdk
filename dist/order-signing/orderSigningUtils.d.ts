import type { SupportedChainId } from '../common';
import type { Signer } from '@ethersproject/abstract-signer';
import type { TypedDataDomain } from '@wowswapfork/contracts';
import type { SigningResult, UnsignedOrder } from './types';
/**
 * Utility class for signing order intents and cancellations.
 *
 * @remarks This class only supports `eth_sign` and wallet-native EIP-712 signing. For use of
 *          `presign` and `eip1271` {@link https://docs.cow.fi/ | see the docs}.
 * @example
 *
 * ```typescript
 * import { OrderSigningUtils, SupportedChainId } from '@cowprotocol/cow-sdk'
 * import { Web3Provider } from '@ethersproject/providers'
 *
 * const account = 'YOUR_WALLET_ADDRESS'
 * const chainId = 5 // Goerli
 * const provider = new Web3Provider(window.ethereum)
 * const signer = provider.getSigner()
 *
 * async function main() {
 *     const { order: Order } = { ... }
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
 */
export declare class OrderSigningUtils {
    /**
     * Sign the order intent with the specified signer.
     *
     * @remarks If the API reports an error with the signature, it is likely to be due to an incorrectly
     *          specified `chainId`. Please ensure that the `chainId` is correct for the network you are
     *          using.
     * @param {UnsignedOrder} order The unsigned order intent to be placed.
     * @param {SupportedChainId} chainId The CoW Protocol `chainId` context that's being used.
     * @param {Signer} signer The signer who is placing the order intent.
     * @returns {Promise<SigningResult>} Encoded signature including signing scheme for the order.
     */
    static signOrder(order: UnsignedOrder, chainId: SupportedChainId, signer: Signer): Promise<SigningResult>;
    /**
     * Sign a cancellation message of an order intent with the specified signer.
     * @param {string} orderUid The unique identifier of the order to cancel.
     * @param {SupportedChainId} chainId The CoW Protocol `chainid` context that's being used.
     * @param {Signer} signer The signer who initially placed the order intent.
     * @returns {Promise<SigningResult>} Encoded signature including signing scheme for the cancellation.
     */
    static signOrderCancellation(orderUid: string, chainId: SupportedChainId, signer: Signer): Promise<SigningResult>;
    /**
     * Sign a cancellation message of multiple order intents with the specified signer.
     * @param {string[]} orderUids An array of `orderUid` to cancel.
     * @param {SupportedChainId} chainId The CoW Protocol protocol `chainId` context that's being used.
     * @param {Signer} signer The signer who initially placed the order intents.
     * @returns {Promise<SigningResult>} Encoded signature including signing scheme for the cancellation.
     */
    static signOrderCancellations(orderUids: string[], chainId: SupportedChainId, signer: Signer): Promise<SigningResult>;
    /**
     * Get the EIP-712 typed domain data being used for signing.
     * @param {SupportedChainId} chainId The CoW Protocol protocol `chainId` context that's being used.
     * @return The EIP-712 typed domain data.
     * @see https://eips.ethereum.org/EIPS/eip-712
     */
    static getDomain(chainId: SupportedChainId): Promise<TypedDataDomain>;
    /**
     * Get the domain separator hash for the EIP-712 typed domain data being used for signing.
     * @param chainId {SupportedChainId} chainId The CoW Protocol protocol `chainId` context that's being used.
     * @returns A string representation of the EIP-712 typed domain data hash.
     */
    static getDomainSeparator(chainId: SupportedChainId): Promise<string>;
    /**
     * Get the EIP-712 types used for signing a GPv2Order.Data struct. This is useful for when
     * signing orders using smart contracts, whereby this SDK cannot do the EIP-1271 signing for you.
     * @returns The EIP-712 types used for signing.
     */
    static getEIP712Types(): Record<string, any>;
}