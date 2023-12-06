import { type ConditionalOrder } from './ConditionalOrder';
import { ConditionalOrderParams } from './types';
export type FromParams<D, S> = (params: ConditionalOrderParams) => ConditionalOrder<D, S>;
export type ConditionalOrderRegistry = Record<string, FromParams<unknown, unknown>>;
export declare class ConditionalOrderFactory {
    knownOrderTypes: ConditionalOrderRegistry;
    constructor(registry: ConditionalOrderRegistry);
    fromParams(params: ConditionalOrderParams): ConditionalOrder<unknown, unknown> | undefined;
}
