import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { TWAP, TWAPInterface } from "../TWAP";
export declare class TWAP__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract ComposableCoW";
            readonly name: "_composableCow";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidFrequency";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidMinPartLimit";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidNumParts";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidPartSellAmount";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSameToken";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidSpan";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidStartTime";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidToken";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "OrderNotValid";
        readonly type: "error";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IConditionalOrder";
                readonly name: "handler";
                readonly type: "address";
            }, {
                readonly internalType: "bytes32";
                readonly name: "salt";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bytes";
                readonly name: "staticInput";
                readonly type: "bytes";
            }];
            readonly indexed: false;
            readonly internalType: "struct IConditionalOrder.ConditionalOrderParams";
            readonly name: "params";
            readonly type: "tuple";
        }];
        readonly name: "ConditionalOrderCreated";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "ctx";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes";
            readonly name: "staticInput";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "";
            readonly type: "bytes";
        }];
        readonly name: "getTradeableOrder";
        readonly outputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IERC20";
                readonly name: "sellToken";
                readonly type: "address";
            }, {
                readonly internalType: "contract IERC20";
                readonly name: "buyToken";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "receiver";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "sellAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "buyAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint32";
                readonly name: "validTo";
                readonly type: "uint32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "appData";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "feeAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "kind";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bool";
                readonly name: "partiallyFillable";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes32";
                readonly name: "sellTokenBalance";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "buyTokenBalance";
                readonly type: "bytes32";
            }];
            readonly internalType: "struct GPv2Order.Data";
            readonly name: "order";
            readonly type: "tuple";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "interfaceId";
            readonly type: "bytes4";
        }];
        readonly name: "supportsInterface";
        readonly outputs: readonly [{
            readonly internalType: "bool";
            readonly name: "";
            readonly type: "bool";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "sender";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "_hash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "domainSeparator";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "ctx";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes";
            readonly name: "staticInput";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "offchainInput";
            readonly type: "bytes";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IERC20";
                readonly name: "sellToken";
                readonly type: "address";
            }, {
                readonly internalType: "contract IERC20";
                readonly name: "buyToken";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "receiver";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "sellAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "buyAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint32";
                readonly name: "validTo";
                readonly type: "uint32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "appData";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "feeAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "kind";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bool";
                readonly name: "partiallyFillable";
                readonly type: "bool";
            }, {
                readonly internalType: "bytes32";
                readonly name: "sellTokenBalance";
                readonly type: "bytes32";
            }, {
                readonly internalType: "bytes32";
                readonly name: "buyTokenBalance";
                readonly type: "bytes32";
            }];
            readonly internalType: "struct GPv2Order.Data";
            readonly name: "";
            readonly type: "tuple";
        }];
        readonly name: "verify";
        readonly outputs: readonly [];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): TWAPInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): TWAP;
}
