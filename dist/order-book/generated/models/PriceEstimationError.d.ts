export type PriceEstimationError = {
    errorType: PriceEstimationError.errorType;
    description: string;
};
export declare namespace PriceEstimationError {
    enum errorType {
        UNSUPPORTED_TOKEN = "UnsupportedToken",
        ZERO_AMOUNT = "ZeroAmount",
        UNSUPPORTED_ORDER_TYPE = "UnsupportedOrderType"
    }
}
