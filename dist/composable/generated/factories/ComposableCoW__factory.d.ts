import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ComposableCoW, ComposableCoWInterface } from "../ComposableCoW";
export declare class ComposableCoW__factory {
    static readonly abi: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_settlement";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "InterfaceNotSupported";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "InvalidHandler";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "ProofNotAuthed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "SingleOrderNotAuthed";
        readonly type: "error";
    }, {
        readonly inputs: readonly [];
        readonly name: "SwapGuardRestricted";
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
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "bytes32";
            readonly name: "root";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "location";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly indexed: false;
            readonly internalType: "struct ComposableCoW.Proof";
            readonly name: "proof";
            readonly type: "tuple";
        }];
        readonly name: "MerkleRootSet";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "contract ISwapGuard";
            readonly name: "swapGuard";
            readonly type: "address";
        }];
        readonly name: "SwapGuardSet";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "cabinet";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
            readonly internalType: "struct IConditionalOrder.ConditionalOrderParams";
            readonly name: "params";
            readonly type: "tuple";
        }, {
            readonly internalType: "bool";
            readonly name: "dispatch";
            readonly type: "bool";
        }];
        readonly name: "create";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
            readonly internalType: "struct IConditionalOrder.ConditionalOrderParams";
            readonly name: "params";
            readonly type: "tuple";
        }, {
            readonly internalType: "contract IValueFactory";
            readonly name: "factory";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly internalType: "bool";
            readonly name: "dispatch";
            readonly type: "bool";
        }];
        readonly name: "createWithContext";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "domainSeparator";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
            readonly internalType: "struct IConditionalOrder.ConditionalOrderParams";
            readonly name: "params";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "offchainInput";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes32[]";
            readonly name: "proof";
            readonly type: "bytes32[]";
        }];
        readonly name: "getTradeableOrderWithSignature";
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
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
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
            readonly internalType: "struct IConditionalOrder.ConditionalOrderParams";
            readonly name: "params";
            readonly type: "tuple";
        }];
        readonly name: "hash";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "pure";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract Safe";
            readonly name: "safe";
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
            readonly name: "_domainSeparator";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes";
            readonly name: "encodeData";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "payload";
            readonly type: "bytes";
        }];
        readonly name: "isValidSafeSignature";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "magic";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "singleOrderHash";
            readonly type: "bytes32";
        }];
        readonly name: "remove";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "roots";
        readonly outputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "root";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "location";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct ComposableCoW.Proof";
            readonly name: "proof";
            readonly type: "tuple";
        }];
        readonly name: "setRoot";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "root";
            readonly type: "bytes32";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "location";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "data";
                readonly type: "bytes";
            }];
            readonly internalType: "struct ComposableCoW.Proof";
            readonly name: "proof";
            readonly type: "tuple";
        }, {
            readonly internalType: "contract IValueFactory";
            readonly name: "factory";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "setRootWithContext";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract ISwapGuard";
            readonly name: "swapGuard";
            readonly type: "address";
        }];
        readonly name: "setSwapGuard";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "singleOrders";
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
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "swapGuards";
        readonly outputs: readonly [{
            readonly internalType: "contract ISwapGuard";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }];
    static createInterface(): ComposableCoWInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ComposableCoW;
}
