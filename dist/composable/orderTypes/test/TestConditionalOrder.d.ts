import { GPv2Order } from '../../generated/ComposableCoW';
import { ConditionalOrder } from '../../ConditionalOrder';
import { IsValidResult, PollParams, PollResultErrors } from '../../types';
export declare const DEFAULT_ORDER_PARAMS: TestConditionalOrderParams;
export type TestConditionalOrderParams = {
    handler: string;
    salt?: string;
    data: string;
    isSingleOrder: boolean;
};
export declare class TestConditionalOrder extends ConditionalOrder<string, string> {
    isSingleOrder: boolean;
    constructor(params: TestConditionalOrderParams);
    get orderType(): string;
    encodeStaticInput(): string;
    testEncodeStaticInput(): string;
    transformStructToData(params: string): string;
    transformDataToStruct(params: string): string;
    protected pollValidate(_params: PollParams): Promise<PollResultErrors | undefined>;
    protected handlePollFailedAlreadyPresent(_orderUid: string, _order: GPv2Order.DataStruct, _params: PollParams): Promise<PollResultErrors | undefined>;
    isValid(): IsValidResult;
    serialize(): string;
    toString(): string;
}
export declare const createTestConditionalOrder: (params?: Partial<TestConditionalOrderParams>) => TestConditionalOrder;
