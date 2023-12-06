import { Order } from './generated';
import { EnrichedOrder } from './types';
/**
 * Apply programmatic transformations to an order.
 *
 * For example, transformations may be applied to an order to recognise it as a Native EthFlow order.
 * @param order to apply transformations to
 * @returns An order with the total fee added.
 */
export declare function transformOrder(order: Order): EnrichedOrder;
