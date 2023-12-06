import { providers } from 'ethers';
import { SupportedChainId } from '../common';
import { ComposableCoW } from './generated';
import { ComposableCoWInterface } from './generated/ComposableCoW';
export declare function getComposableCowInterface(): ComposableCoWInterface;
export declare function getComposableCow(chain: SupportedChainId, provider: providers.Provider): ComposableCoW;
