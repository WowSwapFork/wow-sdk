import type { TypedDataDomain } from '@wowswapfork/contracts';
import type { Signer } from '@ethersproject/abstract-signer';
import type { SigningResult, UnsignedOrder } from './types';
import { SupportedChainId } from '../common';
/**
 * Returns the signature for the specified order with the signing scheme encoded
 * into the signature.
 * @param {UnsignedOrder} order The order to sign.
 * @param {SupportedChainId} chainId The chain Id
 * @param {Signer} signer The owner for the order used to sign.
 * @return {*} Encoded signature including signing scheme for the order.
 */
export declare function signOrder(order: UnsignedOrder, chainId: SupportedChainId, signer: Signer): Promise<SigningResult>;
/**
 * Returns the signature for the Order Cancellation with the signing scheme encoded
 * into the signature.
 * @param {string} orderUid The unique identifier of the order being cancelled.
 * @param {SupportedChainId} chainId The chain Id
 * @param {Signer} signer The owner for the order used to sign.
 * @return {*} Encoded signature including signing scheme for the order.
 */
export declare function signOrderCancellation(orderUid: string, chainId: SupportedChainId, signer: Signer): Promise<SigningResult>;
/**
 * Returns the signature for the Order Cancellations with the signing scheme encoded
 * into the signature.
 *
 * @param {string[]} orderUids The unique identifiers of the orders being cancelled.
 * @param {SupportedChainId} chainId The CoW Protocol protocol `chainId` context that's being used.
 * @param {Signer} signer The owner that had placed the orders used to sign.
 * @returns {*} Encoded signature including signing scheme for the order.
 */
export declare function signOrderCancellations(orderUids: string[], chainId: SupportedChainId, signer: Signer): Promise<SigningResult>;
/**
 * Returns the TypedDataDomain used for signing for the specified chainId.
 * @param {SupportedChainId} chainId The chain Id
 * @return {*} The TypedDataDomain for the specified chainId.
 * @throws {CowError} If the chainId is not supported.
 */
export declare function getDomain(chainId: SupportedChainId): TypedDataDomain;
