import { OrderBookApi } from '../order-book';
import { SupportedChainId } from '../common';
import { GPv2Order } from './generated/ComposableCoW';
import { providers } from 'ethers';
export interface ConditionalOrderArguments<T> {
    handler: string;
    data: T;
    salt?: string;
    hasOffChainInput?: boolean;
}
export type ConditionalOrderParams = {
    readonly handler: string;
    readonly salt: string;
    readonly staticInput: string;
};
export declare enum ProofLocation {
    PRIVATE = 0,
    EMITTED = 1,
    SWARM = 2,
    WAKU = 3,
    RESERVED = 4,
    IPFS = 5
}
/**
 * A factory and it's arguments that are called at transaction mining time to generate the context
 * for a conditional order(s).
 *
 * This allows to support the case where conditional orders may want to *commence* validity at the
 * time of transaction mining, like in the case of a `TWAP` executed by a DAO or `Safe` that takes
 * a reasonable amount of time to aggregate signatures or collect votes.
 *
 * @remarks This is used in conjunction with `setRootWithContext` or `createWithContext`.
 */
export type ContextFactory = {
    address: string;
    factoryArgs?: {
        args: unknown[];
        argsType: string[];
    };
};
/**
 * A struct for a proof that can be used with `setRoot` and `setRootWithContext` on a
 * ComposableCoW-enabled Safe.
 */
export type ProofStruct = {
    location: ProofLocation;
    data: string | '0x';
};
/**
 * Payload for emitting a merkle root to a ComposableCoW-enabled Safe.
 *
 * If setting `ProofLocation.EMITTED`, this type should be used as the `data` in the `Proof` struct.
 */
export type PayloadLocationEmitted = {
    proofs: ProofWithParams[];
};
/**
 * A proof for a conditional order and it's parameters.
 */
export type ProofWithParams = {
    proof: string[];
    params: ConditionalOrderParams;
};
export type OwnerContext = {
    owner: string;
    chainId: SupportedChainId;
    provider: providers.Provider;
};
export type PollParams = OwnerContext & {
    offchainInput?: string;
    proof?: string[];
    /**
     * If present, it can be used for custom conditional order validations. If not present, the orders will need to get the block info themselves
     */
    blockInfo?: BlockInfo;
    /**
     * Allows to optional pass the config of the orderbook API
     */
    orderbookApiConfig?: OrderBookApiConfig;
};
export type OrderBookApiConfig = Omit<ConstructorParameters<typeof OrderBookApi>[0], 'chainId'>;
export type BlockInfo = {
    blockNumber: number;
    blockTimestamp: number;
};
export type PollResult = PollResultSuccess | PollResultErrors;
export type PollResultErrors = PollResultTryNextBlock | PollResultTryOnBlock | PollResultTryAtEpoch | PollResultUnexpectedError | PollResultDontTryAgain;
export declare enum PollResultCode {
    SUCCESS = "SUCCESS",
    UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
    TRY_NEXT_BLOCK = "TRY_NEXT_BLOCK",
    TRY_ON_BLOCK = "TRY_ON_BLOCK",
    TRY_AT_EPOCH = "TRY_AT_EPOCH",
    DONT_TRY_AGAIN = "DONT_TRY_AGAIN"
}
export interface PollResultSuccess {
    readonly result: PollResultCode.SUCCESS;
    readonly order: GPv2Order.DataStruct;
    readonly signature: string;
}
export interface PollResultUnexpectedError {
    readonly result: PollResultCode.UNEXPECTED_ERROR;
    readonly error: unknown;
    reason?: string;
}
export interface PollResultTryNextBlock {
    readonly result: PollResultCode.TRY_NEXT_BLOCK;
    reason?: string;
}
export interface PollResultTryOnBlock {
    readonly result: PollResultCode.TRY_ON_BLOCK;
    readonly blockNumber: number;
    reason?: string;
}
export interface PollResultTryAtEpoch {
    readonly result: PollResultCode.TRY_AT_EPOCH;
    /**
     * The epoch after which it is ok to retry to to poll this order.
     * The value is expressed as a Unix timestamp (in seconds).
     *
     * This epoch will be inclusive, meaning that it is ok to retry at the block mined precisely at this epoch or later.
     */
    readonly epoch: number;
    reason?: string;
}
export interface PollResultDontTryAgain {
    readonly result: PollResultCode.DONT_TRY_AGAIN;
    reason?: string;
}
export type IsValidResult = IsValid | IsNotValid;
export interface IsValid {
    isValid: true;
}
export interface IsNotValid {
    isValid: false;
    reason: string;
}
