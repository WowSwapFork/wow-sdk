import { utils, providers, BigNumber } from 'ethers';
import { SupportedChainId } from '../common';
import { BlockInfo, ConditionalOrderParams } from './types';
import { Order } from '@wowswapfork/contracts';
import { GPv2Order } from './generated/ComposableCoW';
export declare const CONDITIONAL_ORDER_PARAMS_ABI: string[];
export declare const DEFAULT_TOKEN_FORMATTER: (address: string, amount: BigNumber) => string;
export declare function isExtensibleFallbackHandler(handler: string, chainId: SupportedChainId): boolean;
export declare function isComposableCow(handler: string, chainId: SupportedChainId): boolean;
export declare function getDomainVerifier(safe: string, domain: string, chainId: SupportedChainId, provider: providers.Provider): Promise<string>;
export declare function createSetDomainVerifierTx(domain: string, verifier: string): string;
/**
 * Encode the `ConditionalOrderParams` for the conditional order.
 *
 * @param params The `ConditionalOrderParams` struct representing the conditional order as taken from a merkle tree.
 * @returns The ABI-encoded conditional order.
 * @see ConditionalOrderParams
 */
export declare function encodeParams(params: ConditionalOrderParams): string;
/**
 * Decode the `ConditionalOrderParams` for the conditional order.
 *
 * @param encoded The encoded conditional order.
 * @returns The decoded conditional order.
 */
export declare function decodeParams(encoded: string): ConditionalOrderParams;
/**
 * Helper method for validating ABI types.
 * @param types ABI types to validate against.
 * @param values The values to validate.
 * @returns {boolean} Whether the values are valid ABI for the given types.
 */
export declare function isValidAbi(types: readonly (string | utils.ParamType)[], values: any[]): boolean;
export declare function getBlockInfo(provider: providers.Provider): Promise<BlockInfo>;
export declare function formatEpoch(epoch: number): string;
export declare function fromStructToOrder(order: GPv2Order.DataStruct): Order;
