import { providers } from 'ethers';
import { SupportedChainId } from '../common';
import { ComposableCoW, GPv2Order } from './generated/ComposableCoW';
import { ProofLocation, ProofWithParams, ConditionalOrderParams } from './types';
import { ConditionalOrder } from './ConditionalOrder';
export type Orders = Record<string, ConditionalOrder<unknown, unknown>>;
/**
 * Multiplexer for conditional orders - using `ComposableCoW`!
 *
 * This class provides functionality to:
 * - Generate a merkle tree of conditional orders
 * - Generate proofs for all orders in the merkle tree
 * - Save proofs, with the ability to omit / skip specific conditional orders
 * - Support for passing an optional upload function to upload the proofs to a decentralized storage network
 */
export declare class Multiplexer {
    static orderTypeRegistry: Record<string, new (...args: unknown[]) => ConditionalOrder<unknown, unknown>>;
    chain: SupportedChainId;
    location: ProofLocation;
    private orders;
    private tree?;
    private ctx?;
    /**
     * @param chain The `chainId` for where we're using `ComposableCoW`.
     * @param orders An optional array of conditional orders to initialize the merkle tree with.
     * @param root An optional root to verify against.
     * @param location The location of the proofs for the conditional orders.
     */
    constructor(chain: SupportedChainId, orders?: Orders, root?: string, location?: ProofLocation);
    /**
     * Given a serialized multiplexer, create the multiplexer and rehydrate all conditional orders.
     * Integrity of the multiplexer will be verified by generating the merkle tree and verifying
     * the root.
     *
     * **NOTE**: Before using this method, you must register all conditional order types using `Multiplexer.registerOrderType`.
     * @param s The serialized multiplexer.
     * @returns The multiplexer with all conditional orders rehydrated.
     * @throws If the multiplexer cannot be deserialized.
     * @throws If the merkle tree cannot be generated.
     * @throws If the merkle tree cannot be verified against the root.
     */
    static fromJSON(s: string): Multiplexer;
    /**
     * Serialize the multiplexer to JSON.
     *
     * This will include all state necessary to reconstruct the multiplexer, including the root.
     * @remarks This will **NOT** include the merkle tree.
     * @returns The JSON representation of the multiplexer, including the root but excluding the merkle tree.
     */
    toJSON(): string;
    /**
     * Add a conditional order to the merkle tree.
     * @param order The order to add to the merkle tree.
     */
    add<T, P>(order: ConditionalOrder<T, P>): void;
    /**
     * Remove a conditional order from the merkle tree.
     * @param id The id of the `ConditionalOrder` to remove from the merkle tree.
     */
    remove(id: string): void;
    /**
     * Update a given conditional order in the merkle tree.
     * @param id The id of the `ConditionalOrder` to update.
     * @param updater A function that takes the existing `ConditionalOrder` and context, returning an updated `ConditionalOrder`.
     */
    update(id: string, updater: (order: ConditionalOrder<unknown, unknown>, ctx?: string) => ConditionalOrder<unknown, unknown>): void;
    /**
     * Accessor for a given conditional order in the multiplexer.
     * @param id The `id` of the `ConditionalOrder` to retrieve.
     * @returns A `ConditionalOrder` with the given `id`.
     */
    getById(id: string): ConditionalOrder<unknown, unknown>;
    /**
     * Accessor for a given conditional order in the multiplexer.
     * @param i The index of the `ConditionalOrder` to retrieve.
     * @returns A `ConditionalOrder` at the given index.
     */
    getByIndex(i: number): ConditionalOrder<unknown, unknown>;
    /**
     * Get all the conditional order ids in the multiplexer.
     */
    get orderIds(): string[];
    get root(): string;
    /**
     * Retrieve the merkle tree of orders, or generate it if it doesn't exist.
     *
     * **CAUTION**: Developers of the SDK should prefer to use this method instead of generating the
     *              merkle tree themselves. This method makes use of caching to avoid generating the
     *              merkle tree needlessly.
     * @throws If the merkle tree cannot be generated.
     * @returns The merkle tree for the current set of conditional orders.
     */
    private getOrGenerateTree;
    /**
     * The primary method for watch towers to use when deserializing the proofs and parameters for the conditional orders.
     * @param s The serialized proofs with parameters for consumption by watchtowers / indexers.
     * @returns The `ProofWithParams` array.
     * @throws If the `ProofWithParams` array cannot be deserialized.
     */
    static decodeFromJSON(s: string): ProofWithParams[];
    /**
     * The primary entry point for dapps integrating with `ComposableCoW` to generate the proofs and
     * parameters for the conditional orders.
     *
     * After populating the multiplexer with conditional orders, this method can be used to generate
     * the proofs and parameters for the conditional orders. The returned `ProofStruct` can then be
     * used with `setRoot` or `setRootWithContext` on a `ComposableCoW`-enabled Safe.
     *
     * @param filter {@link getProofs}
     * @parma locFn A function that takes the off-chain encoded input, and returns the `location`
     *        for the `ProofStruct`, and the `data` for the `ProofStruct`.
     * @returns The ABI-encoded `ProofStruct` for `setRoot` and `setRootWithContext`.
     */
    prepareProofStruct(location?: ProofLocation, filter?: (v: string[]) => boolean, uploader?: (offChainEncoded: string) => Promise<string>): Promise<ComposableCoW.ProofStruct>;
    /**
     * Poll a conditional order to see if it is tradeable.
     * @param owner The owner of the conditional order.
     * @param p The proof and parameters.
     * @param chain Which chain to use for the ComposableCoW contract.
     * @param provider An RPC provider for the chain.
     * @param offChainInputFn A function, if provided, that will return the off-chain input for the conditional order.
     * @throws If the conditional order is not tradeable.
     * @returns The tradeable `GPv2Order.Data` struct and the `signature` for the conditional order.
     */
    static poll(owner: string, p: ProofWithParams, chain: SupportedChainId, provider: providers.Provider, offChainInputFn?: (owner: string, params: ConditionalOrderParams) => Promise<string>): Promise<[GPv2Order.DataStruct, string]>;
    /**
     * The primary entry point for dumping the proofs and parameters for the conditional orders.
     *
     * This is to be used by watchtowers / indexers to store the proofs and parameters for the
     * conditional orders off-chain. The encoding returned by this method may **NOT** contain all
     * proofs and parameters, depending on the `filter` provided, and therefore should not be used
     * to rehydrate the multiplexer from a user's perspective.
     * @param filter {@link getProofs}
     * @returns A JSON-encoded string of the proofs and parameters for the conditional orders.
     */
    dumpProofs(filter?: (v: string[]) => boolean): string;
    dumpProofsAndParams(filter?: (v: string[]) => boolean): ProofWithParams[];
    /**
     * Get the proofs with parameters for the conditional orders in the merkle tree.
     * @param filter A function that takes a conditional order and returns a boolean indicating
     *               whether the order should be included in the proof.
     * @returns An array of proofs and their order's parameters for the conditional orders in the
     *          merkle tree.
     */
    private getProofs;
    /**
     * ABI-encode the proofs and parameters for the conditional orders in the merkle tree.
     * @param filter {@link getProofs}
     * @returns ABI-encoded `data` for the `ProofStruct`.
     */
    private encodeToABI;
    /**
     * JSON-encode the proofs and parameters for the conditional orders in the merkle tree.
     * @param filter {@link getProofs}
     * @returns The JSON-encoded data for storage off-chain.
     */
    private encodeToJSON;
    /**
     * A helper to reset the merkle tree.
     */
    private reset;
    /**
     * Register a conditional order type with the multiplexer.
     *
     * **CAUTION**: This is required for using `Multiplexer.fromJSON` and `Multiplexer.toJSON`.
     * @param orderType The order type to register.
     * @param conditionalOrderClass The class to use for the given order type.
     */
    static registerOrderType(orderType: string, conditionalOrderClass: new (...args: any[]) => ConditionalOrder<unknown, unknown>): void;
    /**
     * Reset the order type registry.
     */
    static resetOrderTypeRegistry(): void;
}
