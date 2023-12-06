import { BigNumber } from 'ethers';
import { GPv2Order } from './generated/ComposableCoW';
import { ConditionalOrderArguments, ConditionalOrderParams, ContextFactory, IsValidResult, OwnerContext, PollParams, PollResult, PollResultErrors } from './types';
import { UID } from '../order-book';
/**
 * An abstract base class from which all conditional orders should inherit.
 *
 * This class provides some basic functionality to help with handling conditional orders,
 * such as:
 * - Validating the conditional order
 * - Creating a human-readable string representation of the conditional order
 * - Serializing the conditional order for use with the `IConditionalOrder` struct
 * - Getting any dependencies for the conditional order
 * - Getting the off-chain input for the conditional order
 *
 * **NOTE**: Instances of conditional orders have an `id` property that is a `keccak256` hash of
 *           the serialized conditional order.
 */
export declare abstract class ConditionalOrder<D, S> {
    readonly handler: string;
    readonly salt: string;
    readonly data: D;
    readonly staticInput: S;
    readonly hasOffChainInput: boolean;
    /**
     * A constructor that provides some basic validation for the conditional order.
     *
     * This constructor **MUST** be called by any class that inherits from `ConditionalOrder`.
     *
     * **NOTE**: The salt is optional and will be randomly generated if not provided.
     * @param handler The address of the handler for the conditional order.
     * @param salt A 32-byte string used to salt the conditional order.
     * @param data The data of the order
     * @param hasOffChainInput Whether the conditional order has off-chain input.
     * @throws If the handler is not a valid ethereum address.
     * @throws If the salt is not a valid 32-byte string.
     */
    constructor(params: ConditionalOrderArguments<D>);
    abstract get isSingleOrder(): boolean;
    /**
     * Get a descriptive name for the type of the conditional order (i.e twap, dca, etc).
     *
     * @returns {string} The concrete type of the conditional order.
     */
    abstract get orderType(): string;
    /**
     * Get the context dependency for the conditional order.
     *
     * This is used when calling `createWithContext` or `setRootWithContext` on a ComposableCoW-enabled Safe.
     * @returns The context dependency.
     */
    get context(): ContextFactory | undefined;
    assertIsValid(): void;
    abstract isValid(): IsValidResult;
    /**
     * Get the calldata for creating the conditional order.
     *
     * This will automatically determine whether or not to use `create` or `createWithContext` based on the
     * order type's context dependency.
     *
     * **NOTE**: By default, this will cause the create to emit the `ConditionalOrderCreated` event.
     * @returns The calldata for creating the conditional order.
     */
    get createCalldata(): string;
    /**
     * Get the calldata for removing a conditional order that was created as a single order.
     * @returns The calldata for removing the conditional order.
     */
    get removeCalldata(): string;
    /**
     * Calculate the id of the conditional order (which also happens to be the key used for `ctx` in the ComposableCoW contract).
     *
     * This is a `keccak256` hash of the serialized conditional order.
     * @returns The id of the conditional order.
     */
    get id(): string;
    /**
     * The context key of the order (bytes32(0) if a merkle tree is used, otherwise H(params)) with which to lookup the cabinet
     *
     * The context, relates to the 'ctx' in the contract: https://github.com/cowprotocol/composable-cow/blob/c7fb85ab10c05e28a1632ba97a1749fb261fcdfb/src/interfaces/IConditionalOrder.sol#L38
     */
    protected get ctx(): string;
    /**
     * Get the `leaf` of the conditional order. This is the data that is used to create the merkle tree.
     *
     * For the purposes of this library, the `leaf` is the `ConditionalOrderParams` struct.
     * @returns The `leaf` of the conditional order.
     * @see ConditionalOrderParams
     */
    get leaf(): ConditionalOrderParams;
    /**
     * Calculate the id of the conditional order.
     * @param leaf The `leaf` representing the conditional order.
     * @returns The id of the conditional order.
     * @see ConditionalOrderParams
     */
    static leafToId(leaf: ConditionalOrderParams): string;
    /**
     * If the conditional order has off-chain input, return it!
     *
     * **NOTE**: This should be overridden by any conditional order that has off-chain input.
     * @returns The off-chain input.
     */
    get offChainInput(): string;
    /**
     * Create a human-readable string representation of the conditional order.
     *
     * @param tokenFormatter An optional function that takes an address and an amount and returns a human-readable string.
     */
    abstract toString(tokenFormatter?: (address: string, amount: BigNumber) => string): string;
    /**
     * Serializes the conditional order into it's ABI-encoded form.
     *
     * @returns The equivalent of `IConditionalOrder.Params` for the conditional order.
     */
    abstract serialize(): string;
    /**
     * Encode the `staticInput` for the conditional order.
     *
     * @returns The ABI-encoded `staticInput` for the conditional order.
     * @see ConditionalOrderParams
     */
    abstract encodeStaticInput(): string;
    /**
     * A helper function for generically serializing a conditional order's static input.
     *
     * @param orderDataTypes ABI types for the order's data struct.
     * @param data The order's data struct.
     * @returns An ABI-encoded representation of the order's data struct.
     */
    protected encodeStaticInputHelper(orderDataTypes: string[], staticInput: S): string;
    /**
     * Poll a conditional order to see if it is tradeable.
     *
     * @param owner The owner of the conditional order.
     * @param p The proof and parameters.
     * @param chain Which chain to use for the ComposableCoW contract.
     * @param provider An RPC provider for the chain.
     * @param offChainInputFn A function, if provided, that will return the off-chain input for the conditional order.
     * @throws If the conditional order is not tradeable.
     * @returns The tradeable `GPv2Order.Data` struct and the `signature` for the conditional order.
     */
    poll(params: PollParams): Promise<PollResult>;
    /**
     * Checks if the owner authorized the conditional order.
     *
     * @param params owner context, to be able to check if the order is authorized
     * @returns true if the owner authorized the order, false otherwise.
     */
    isAuthorized(params: OwnerContext): Promise<boolean>;
    /**
     * Checks the value in the cabinet for a given owner and chain
     *
     * @param params owner context, to be able to check the cabinet
     */
    cabinet(params: OwnerContext): Promise<string>;
    /**
     * Allow concrete conditional orders to perform additional validation for the poll method.
     *
     * This will allow the concrete orders to decide when an order shouldn't be polled again. For example, if the orders is expired.
     * It also allows to signal when should the next check be done. For example, an order could signal that the validations will fail until a certain time or block.
     *
     * @param params The poll parameters
     *
     * @returns undefined if the concrete order can't make a decision. Otherwise, it returns a PollResultErrors object.
     */
    protected abstract pollValidate(params: PollParams): Promise<PollResultErrors | undefined>;
    /**
     * This method lets the concrete conditional order decide what to do if the order yielded in the polling is already present in the Orderbook API.
     *
     * The concrete conditional order will have a chance to schedule the next poll.
     * For example, a TWAP order that has the current part already in the orderbook, can signal that the next poll should be done at the start time of the next part.
     *
     * @param params
     */
    protected abstract handlePollFailedAlreadyPresent(orderUid: UID, order: GPv2Order.DataStruct, params: PollParams): Promise<PollResultErrors | undefined>;
    /**
     * Convert the struct that the contract expect as an encoded `staticInput` into a friendly data object modelling the smart order.
     *
     * **NOTE**: This should be overridden by any conditional order that requires transformations.
     * This implementation is a no-op if you use the same type for both.
     *
     * @param params {S} Parameters that are passed in to the constructor.
     * @returns {D} The static input for the conditional order.
     */
    abstract transformStructToData(params: S): D;
    /**
     * Converts a friendly data object modelling the smart order into the struct that the contract expect as an encoded `staticInput`.
     *
     * **NOTE**: This should be overridden by any conditional order that requires transformations.
     * This implementation is a no-op if you use the same type for both.
     *
     * @param params {S} Parameters that are passed in to the constructor.
     * @returns {D} The static input for the conditional order.
     */
    abstract transformDataToStruct(params: D): S;
    /**
     * A helper function for generically deserializing a conditional order.
     * @param s The ABI-encoded `IConditionalOrder.Params` struct to deserialize.
     * @param handler Address of the handler for the conditional order.
     * @param orderDataTypes ABI types for the order's data struct.
     * @param callback A callback function that takes the deserialized data struct and the salt and returns an instance of the class.
     * @returns An instance of the conditional order class.
     */
    protected static deserializeHelper<T>(s: string, handler: string, orderDataTypes: string[], callback: (d: any, salt: string) => T): T;
}
