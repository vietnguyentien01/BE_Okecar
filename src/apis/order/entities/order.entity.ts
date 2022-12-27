// eslint-disable-next-line
import { IOrder } from '../../../interfaces/order.interface'
import { Order } from '../model/order.schema'

// eslint-disable-next-line
export interface OrderEntity extends IOrder {}

export class OrderEntity {
    constructor(partial: Partial<Order>) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id
            this.buyerId = partial.buyerId
            this.sellerId = partial.sellerId
            this.orderStatus = partial.orderStatus
            this.bookingDate = partial.bookingDate
            this.paymentStatus = partial.paymentStatus
            this.createdAt = partial.createdAt
        }
    }
}
