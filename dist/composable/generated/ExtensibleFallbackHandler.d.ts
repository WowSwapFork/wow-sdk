import type { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ExtensibleFallbackHandlerInterface extends utils.Interface {
    functions: {
        "domainVerifiers(address,bytes32)": FunctionFragment;
        "isValidSignature(bytes32,bytes)": FunctionFragment;
        "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
        "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "safeInterfaces(address,bytes4)": FunctionFragment;
        "safeMethods(address,bytes4)": FunctionFragment;
        "setDomainVerifier(bytes32,address)": FunctionFragment;
        "setSafeMethod(bytes4,bytes32)": FunctionFragment;
        "setSupportedInterface(bytes4,bool)": FunctionFragment;
        "setSupportedInterfaceBatch(bytes4,bytes32[])": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "domainVerifiers" | "isValidSignature" | "onERC1155BatchReceived" | "onERC1155Received" | "onERC721Received" | "safeInterfaces" | "safeMethods" | "setDomainVerifier" | "setSafeMethod" | "setSupportedInterface" | "setSupportedInterfaceBatch" | "supportsInterface"): FunctionFragment;
    encodeFunctionData(functionFragment: "domainVerifiers", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "isValidSignature", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "onERC1155BatchReceived", values: [string, string, BigNumberish[], BigNumberish[], BytesLike]): string;
    encodeFunctionData(functionFragment: "onERC1155Received", values: [string, string, BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeInterfaces", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "safeMethods", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "setDomainVerifier", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "setSafeMethod", values: [BytesLike, BytesLike]): string;
    encodeFunctionData(functionFragment: "setSupportedInterface", values: [BytesLike, boolean]): string;
    encodeFunctionData(functionFragment: "setSupportedInterfaceBatch", values: [BytesLike, BytesLike[]]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "domainVerifiers", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isValidSignature", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155BatchReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeInterfaces", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeMethods", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setDomainVerifier", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSafeMethod", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSupportedInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setSupportedInterfaceBatch", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    events: {
        "AddedDomainVerifier(address,bytes32,address)": EventFragment;
        "AddedInterface(address,bytes4)": EventFragment;
        "AddedSafeMethod(address,bytes4,bytes32)": EventFragment;
        "ChangedDomainVerifier(address,bytes32,address,address)": EventFragment;
        "ChangedSafeMethod(address,bytes4,bytes32,bytes32)": EventFragment;
        "RemovedDomainVerifier(address,bytes32)": EventFragment;
        "RemovedInterface(address,bytes4)": EventFragment;
        "RemovedSafeMethod(address,bytes4)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AddedDomainVerifier"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AddedInterface"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "AddedSafeMethod"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ChangedDomainVerifier"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ChangedSafeMethod"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemovedDomainVerifier"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemovedInterface"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RemovedSafeMethod"): EventFragment;
}
export interface AddedDomainVerifierEventObject {
    safe: string;
    domainSeparator: string;
    verifier: string;
}
export type AddedDomainVerifierEvent = TypedEvent<[
    string,
    string,
    string
], AddedDomainVerifierEventObject>;
export type AddedDomainVerifierEventFilter = TypedEventFilter<AddedDomainVerifierEvent>;
export interface AddedInterfaceEventObject {
    safe: string;
    interfaceId: string;
}
export type AddedInterfaceEvent = TypedEvent<[
    string,
    string
], AddedInterfaceEventObject>;
export type AddedInterfaceEventFilter = TypedEventFilter<AddedInterfaceEvent>;
export interface AddedSafeMethodEventObject {
    safe: string;
    selector: string;
    method: string;
}
export type AddedSafeMethodEvent = TypedEvent<[
    string,
    string,
    string
], AddedSafeMethodEventObject>;
export type AddedSafeMethodEventFilter = TypedEventFilter<AddedSafeMethodEvent>;
export interface ChangedDomainVerifierEventObject {
    safe: string;
    domainSeparator: string;
    oldVerifier: string;
    newVerifier: string;
}
export type ChangedDomainVerifierEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ChangedDomainVerifierEventObject>;
export type ChangedDomainVerifierEventFilter = TypedEventFilter<ChangedDomainVerifierEvent>;
export interface ChangedSafeMethodEventObject {
    safe: string;
    selector: string;
    oldMethod: string;
    newMethod: string;
}
export type ChangedSafeMethodEvent = TypedEvent<[
    string,
    string,
    string,
    string
], ChangedSafeMethodEventObject>;
export type ChangedSafeMethodEventFilter = TypedEventFilter<ChangedSafeMethodEvent>;
export interface RemovedDomainVerifierEventObject {
    safe: string;
    domainSeparator: string;
}
export type RemovedDomainVerifierEvent = TypedEvent<[
    string,
    string
], RemovedDomainVerifierEventObject>;
export type RemovedDomainVerifierEventFilter = TypedEventFilter<RemovedDomainVerifierEvent>;
export interface RemovedInterfaceEventObject {
    safe: string;
    interfaceId: string;
}
export type RemovedInterfaceEvent = TypedEvent<[
    string,
    string
], RemovedInterfaceEventObject>;
export type RemovedInterfaceEventFilter = TypedEventFilter<RemovedInterfaceEvent>;
export interface RemovedSafeMethodEventObject {
    safe: string;
    selector: string;
}
export type RemovedSafeMethodEvent = TypedEvent<[
    string,
    string
], RemovedSafeMethodEventObject>;
export type RemovedSafeMethodEventFilter = TypedEventFilter<RemovedSafeMethodEvent>;
export interface ExtensibleFallbackHandler extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ExtensibleFallbackHandlerInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        domainVerifiers(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        isValidSignature(_hash: BytesLike, signature: BytesLike, overrides?: CallOverrides): Promise<[string] & {
            magic: string;
        }>;
        onERC1155BatchReceived(arg0: string, arg1: string, arg2: BigNumberish[], arg3: BigNumberish[], arg4: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        onERC1155Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BigNumberish, arg4: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        onERC721Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        safeInterfaces(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
        safeMethods(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        setDomainVerifier(domainSeparator: BytesLike, newVerifier: string, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setSafeMethod(selector: BytesLike, newMethod: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setSupportedInterface(interfaceId: BytesLike, supported: boolean, overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        setSupportedInterfaceBatch(_interfaceId: BytesLike, handlerWithSelectors: BytesLike[], overrides?: Overrides & {
            from?: string;
        }): Promise<ContractTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<[boolean]>;
    };
    domainVerifiers(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<string>;
    isValidSignature(_hash: BytesLike, signature: BytesLike, overrides?: CallOverrides): Promise<string>;
    onERC1155BatchReceived(arg0: string, arg1: string, arg2: BigNumberish[], arg3: BigNumberish[], arg4: BytesLike, overrides?: CallOverrides): Promise<string>;
    onERC1155Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BigNumberish, arg4: BytesLike, overrides?: CallOverrides): Promise<string>;
    onERC721Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BytesLike, overrides?: CallOverrides): Promise<string>;
    safeInterfaces(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    safeMethods(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<string>;
    setDomainVerifier(domainSeparator: BytesLike, newVerifier: string, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setSafeMethod(selector: BytesLike, newMethod: BytesLike, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setSupportedInterface(interfaceId: BytesLike, supported: boolean, overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    setSupportedInterfaceBatch(_interfaceId: BytesLike, handlerWithSelectors: BytesLike[], overrides?: Overrides & {
        from?: string;
    }): Promise<ContractTransaction>;
    supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    callStatic: {
        domainVerifiers(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<string>;
        isValidSignature(_hash: BytesLike, signature: BytesLike, overrides?: CallOverrides): Promise<string>;
        onERC1155BatchReceived(arg0: string, arg1: string, arg2: BigNumberish[], arg3: BigNumberish[], arg4: BytesLike, overrides?: CallOverrides): Promise<string>;
        onERC1155Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BigNumberish, arg4: BytesLike, overrides?: CallOverrides): Promise<string>;
        onERC721Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BytesLike, overrides?: CallOverrides): Promise<string>;
        safeInterfaces(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<boolean>;
        safeMethods(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<string>;
        setDomainVerifier(domainSeparator: BytesLike, newVerifier: string, overrides?: CallOverrides): Promise<void>;
        setSafeMethod(selector: BytesLike, newMethod: BytesLike, overrides?: CallOverrides): Promise<void>;
        setSupportedInterface(interfaceId: BytesLike, supported: boolean, overrides?: CallOverrides): Promise<void>;
        setSupportedInterfaceBatch(_interfaceId: BytesLike, handlerWithSelectors: BytesLike[], overrides?: CallOverrides): Promise<void>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "AddedDomainVerifier(address,bytes32,address)"(safe?: string | null, domainSeparator?: null, verifier?: null): AddedDomainVerifierEventFilter;
        AddedDomainVerifier(safe?: string | null, domainSeparator?: null, verifier?: null): AddedDomainVerifierEventFilter;
        "AddedInterface(address,bytes4)"(safe?: string | null, interfaceId?: null): AddedInterfaceEventFilter;
        AddedInterface(safe?: string | null, interfaceId?: null): AddedInterfaceEventFilter;
        "AddedSafeMethod(address,bytes4,bytes32)"(safe?: string | null, selector?: null, method?: null): AddedSafeMethodEventFilter;
        AddedSafeMethod(safe?: string | null, selector?: null, method?: null): AddedSafeMethodEventFilter;
        "ChangedDomainVerifier(address,bytes32,address,address)"(safe?: string | null, domainSeparator?: null, oldVerifier?: null, newVerifier?: null): ChangedDomainVerifierEventFilter;
        ChangedDomainVerifier(safe?: string | null, domainSeparator?: null, oldVerifier?: null, newVerifier?: null): ChangedDomainVerifierEventFilter;
        "ChangedSafeMethod(address,bytes4,bytes32,bytes32)"(safe?: string | null, selector?: null, oldMethod?: null, newMethod?: null): ChangedSafeMethodEventFilter;
        ChangedSafeMethod(safe?: string | null, selector?: null, oldMethod?: null, newMethod?: null): ChangedSafeMethodEventFilter;
        "RemovedDomainVerifier(address,bytes32)"(safe?: string | null, domainSeparator?: null): RemovedDomainVerifierEventFilter;
        RemovedDomainVerifier(safe?: string | null, domainSeparator?: null): RemovedDomainVerifierEventFilter;
        "RemovedInterface(address,bytes4)"(safe?: string | null, interfaceId?: null): RemovedInterfaceEventFilter;
        RemovedInterface(safe?: string | null, interfaceId?: null): RemovedInterfaceEventFilter;
        "RemovedSafeMethod(address,bytes4)"(safe?: string | null, selector?: null): RemovedSafeMethodEventFilter;
        RemovedSafeMethod(safe?: string | null, selector?: null): RemovedSafeMethodEventFilter;
    };
    estimateGas: {
        domainVerifiers(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        isValidSignature(_hash: BytesLike, signature: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        onERC1155BatchReceived(arg0: string, arg1: string, arg2: BigNumberish[], arg3: BigNumberish[], arg4: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        onERC1155Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BigNumberish, arg4: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        safeInterfaces(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        safeMethods(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        setDomainVerifier(domainSeparator: BytesLike, newVerifier: string, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setSafeMethod(selector: BytesLike, newMethod: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setSupportedInterface(interfaceId: BytesLike, supported: boolean, overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        setSupportedInterfaceBatch(_interfaceId: BytesLike, handlerWithSelectors: BytesLike[], overrides?: Overrides & {
            from?: string;
        }): Promise<BigNumber>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        domainVerifiers(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isValidSignature(_hash: BytesLike, signature: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC1155BatchReceived(arg0: string, arg1: string, arg2: BigNumberish[], arg3: BigNumberish[], arg4: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC1155Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BigNumberish, arg4: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC721Received(arg0: string, arg1: string, arg2: BigNumberish, arg3: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        safeInterfaces(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        safeMethods(arg0: string, arg1: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setDomainVerifier(domainSeparator: BytesLike, newVerifier: string, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setSafeMethod(selector: BytesLike, newMethod: BytesLike, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setSupportedInterface(interfaceId: BytesLike, supported: boolean, overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        setSupportedInterfaceBatch(_interfaceId: BytesLike, handlerWithSelectors: BytesLike[], overrides?: Overrides & {
            from?: string;
        }): Promise<PopulatedTransaction>;
        supportsInterface(interfaceId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
