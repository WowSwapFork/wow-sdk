import { BigNumber } from 'ethers';
import { ConditionalOrder } from '../ConditionalOrder';
import { ConditionalOrderArguments, ConditionalOrderParams, ContextFactory, OwnerContext, IsValidResult, PollParams, PollResultErrors } from '../types';
import { GPv2Order } from '../generated/ComposableCoW';
export declare const TWAP_ADDRESS = "0x6cF1e9cA41f7611dEf408122793c358a3d11E5a5";
/**
 * The address of the `CurrentBlockTimestampFactory` contract
 *
 * **NOTE**: This is used in the event that TWAP's have a `t0` of `0`.
 */
export declare const CURRENT_BLOCK_TIMESTAMP_FACTORY_ADDRESS = "0x52eD56Da04309Aca4c3FECC595298d80C2f16BAc";
export declare const MAX_UINT32: BigNumber;
export declare const MAX_FREQUENCY: BigNumber;
/**
 * Base parameters for a TWAP order. Shared by:
 *   - TwapStruct (modelling the contract's struct used for `staticInput`).
 *   - TwapData (modelling the friendly SDK interface).
 */
export type TwapDataBase = {
    /**
     * which token to sell
     */
    readonly sellToken: string;
    /**
     * which token to buy
     */
    readonly buyToken: string;
    /**
     * who to send the tokens to
     */
    readonly receiver: string;
    /**
     * Meta-data associated with the order. Normally would be the keccak256 hash of the document generated in http://github.com/cowprotocol/app-data
     *
     * This hash should have been uploaded to the API https://api.cow.fi/docs/#/default/put_api_v1_app_data__app_data_hash_ and potentially to other data availability protocols like IPFS.
     *
     */
    readonly appData: string;
};
/**
 * Parameters for a TWAP order, as expected by the contract's `staticInput`.
 */
export interface TwapStruct extends TwapDataBase {
    /**
     * amount of sellToken to sell in each part
     */
    readonly partSellAmount: BigNumber;
    /**
     * minimum amount of buyToken that must be bought in each part
     */
    readonly minPartLimit: BigNumber;
    /**
     * start time of the TWAP
     */
    readonly t0: BigNumber;
    /**
     * number of parts
     */
    readonly n: BigNumber;
    /**
     * duration of the TWAP interval
     */
    readonly t: BigNumber;
    /**
     * whether the TWAP is valid for the entire interval or not
     */
    readonly span: BigNumber;
}
/**
 * Parameters for a TWAP order, made a little more user-friendly for SDK users.
 *
 * @see {@link TwapStruct} for the native struct.
 */
export interface TwapData extends TwapDataBase {
    /**
     * total amount of sellToken to sell across the entire TWAP
     */
    readonly sellAmount: BigNumber;
    /**
     * minimum amount of buyToken that must be bought across the entire TWAP
     */
    readonly buyAmount: BigNumber;
    /**
     * start time of the TWAP
     */
    readonly startTime?: StartTime;
    /**
     * number of parts
     */
    readonly numberOfParts: BigNumber;
    /**
     * duration of the TWAP interval
     */
    readonly timeBetweenParts: BigNumber;
    /**
     * whether the TWAP is valid for the entire interval or not
     */
    readonly durationOfPart?: DurationOfPart;
}
export type DurationOfPart = {
    durationType: DurationType.AUTO;
} | {
    durationType: DurationType.LIMIT_DURATION;
    duration: BigNumber;
};
export declare enum DurationType {
    AUTO = "AUTO",
    LIMIT_DURATION = "LIMIT_DURATION"
}
export type StartTime = {
    startType: StartTimeValue.AT_MINING_TIME;
} | {
    startType: StartTimeValue.AT_EPOCH;
    epoch: BigNumber;
};
export declare enum StartTimeValue {
    AT_MINING_TIME = "AT_MINING_TIME",
    AT_EPOCH = "AT_EPOCH"
}
/**
 * `ComposableCoW` implementation of a TWAP order.
 * @author mfw78 <mfw78@rndlabs.xyz>
 */
export declare class Twap extends ConditionalOrder<TwapData, TwapStruct> {
    isSingleOrder: boolean;
    /**
     * @see {@link ConditionalOrder.constructor}
     * @throws If the TWAP order is invalid.
     * @throws If the TWAP order is not ABI-encodable.
     * @throws If the handler is not the TWAP address.
     */
    constructor(params: ConditionalOrderArguments<TwapData>);
    /**
     * Create a TWAP order with sound defaults.
     * @param data The TWAP order parameters in a more user-friendly format.
     * @returns An instance of the TWAP order.
     */
    static fromData(data: TwapData, salt?: string): Twap;
    /**
     * Create a TWAP order with sound defaults.
     * @param data The TWAP order parameters in a more user-friendly format.
     * @returns An instance of the TWAP order.
     */
    static fromParams(params: ConditionalOrderParams): Twap;
    /**
     * Enforces that TWAPs will commence at the beginning of a block by use of the
     * `CurrentBlockTimestampFactory` contract to provide the current block timestamp
     * as the start time of the TWAP.
     */
    get context(): ContextFactory | undefined;
    /**
     * @inheritdoc {@link ConditionalOrder.orderType}
     */
    get orderType(): string;
    /**
     * Validate the TWAP order.
     * @param data The TWAP order to validate.
     * @returns Whether the TWAP order is valid.
     * @throws If the TWAP order is invalid.
     * @see {@link TwapStruct} for the native struct.
     */
    isValid(): IsValidResult;
    protected startTimestamp(params: OwnerContext): Promise<number>;
    /**
     * Given the start timestamp of the TWAP, calculate the end timestamp.
     * @dev As usually the `endTimestamp` is used when determining a TWAP's validity, we don't
     *      do any lookup to the blockchain to determine the start timestamp, as this has likely
     *      already been done during the verification flow.
     * @dev Beware to handle the case of `span != 0` ie. `durationOfPart.durationType !== DurationType.AUTO`.
     * @param startTimestamp The start timestamp of the TWAP.
     * @returns The timestamp at which the TWAP will end.
     */
    protected endTimestamp(startTimestamp: number): number;
    /**
     * Checks if the owner authorized the conditional order.
     *
     * @param owner The owner of the conditional order.
     * @param chain Which chain to use for the ComposableCoW contract.
     * @param provider An RPC provider for the chain.
     * @returns true if the owner authorized the order, false otherwise.
     */
    protected pollValidate(params: PollParams): Promise<PollResultErrors | undefined>;
    /**
     * Handles the error when the order is already present in the orderbook.
     *
     * Given the current part is in the book, it will signal to Watch Tower what to do:
     *   - Wait until the next part starts
     *   - Don't try again if current part is the last one
     *
     * NOTE: The error messages will refer to the parts 1-indexed, so first part is 1, second part is 2, etc.
     */
    protected handlePollFailedAlreadyPresent(_orderUid: string, _order: GPv2Order.DataStruct, params: PollParams): Promise<PollResultErrors | undefined>;
    /**
     * Serialize the TWAP order into it's ABI-encoded form.
     * @returns {string} The ABI-encoded TWAP order.
     */
    serialize(): string;
    /**
     * Get the encoded static input for the TWAP order.
     * @returns {string} The ABI-encoded TWAP order.
     */
    encodeStaticInput(): string;
    /**
     * Deserialize a TWAP order from it's ABI-encoded form.
     * @param {string} twapSerialized ABI-encoded TWAP order to deserialize.
     * @returns A deserialized TWAP order.
     */
    static deserialize(twapSerialized: string): Twap;
    /**
     * Create a human-readable string representation of the TWAP order.
     * @returns {string} A human-readable string representation of the TWAP order.
     */
    toString(): string;
    /**
     * Transform parameters into a native struct.
     *
     * @param {TwapData} data As passed by the consumer of the API.
     * @returns {TwapStruct} A formatted struct as expected by the smart contract.
     */
    transformDataToStruct(data: TwapData): TwapStruct;
    /**
     * Transform parameters into a TWAP order struct.
     *
     * @param {TwapData} params As passed by the consumer of the API.
     * @returns {TwapStruct} A formatted struct as expected by the smart contract.
     */
    transformStructToData(struct: TwapStruct): TwapData;
}
/**
 * Transform parameters into a native struct.
 *
 * @param {TwapData} data As passed by the consumer of the API.
 * @returns {TwapStruct} A formatted struct as expected by the smart contract.
 */
export declare function transformDataToStruct(data: TwapData): TwapStruct;
/**
 * Transform parameters into a TWAP order struct.
 *
 * @param {TwapData} params As passed by the consumer of the API.
 * @returns {TwapStruct} A formatted struct as expected by the smart contract.
 */
export declare function transformStructToData(struct: TwapStruct): TwapData;
