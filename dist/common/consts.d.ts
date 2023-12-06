import { SupportedChainId } from './chains';
export declare const BUY_ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export declare const EXTENSIBLE_FALLBACK_HANDLER = "0x2f55e8b20D0B9FEFA187AA7d00B6Cbe563605bF5";
export declare const COMPOSABLE_COW = "0x5d84eB96e4D57fB2a7945f32be7401237eD243ad";
/**
 * The list of supported chains.
 */
export declare const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[];
/**
 * An object containing the addresses of the CoW Protocol settlement contracts for each supported chain.
 */
export declare const COW_PROTOCOL_SETTLEMENT_CONTRACT_ADDRESS: Record<number, string>;
/**
 * An object containing the addresses of the `ExtensibleFallbackHandler` contracts for each supported chain.
 */
export declare const EXTENSIBLE_FALLBACK_HANDLER_CONTRACT_ADDRESS: Record<number, string>;
/**
 * An object containing the addresses of the `ComposableCow` contracts for each supported chain.
 */
export declare const COMPOSABLE_COW_CONTRACT_ADDRESS: Record<number, string>;
