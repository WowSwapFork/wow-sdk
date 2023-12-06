import type { Order } from '@wowswapfork/contracts';
import type { SupportedChainId } from './common';
export declare function computeOrderUid(chainId: SupportedChainId, owner: string, order: Order): Promise<string>;
