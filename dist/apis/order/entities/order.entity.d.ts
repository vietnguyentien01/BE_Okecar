import { IOrder } from '../../../interfaces/order.interface';
import { Order } from '../model/order.schema';
export interface OrderEntity extends IOrder {
}
export declare class OrderEntity {
    constructor(partial: Partial<Order>);
}
