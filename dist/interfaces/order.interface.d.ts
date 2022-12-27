import { ORDER_STATUS, PAYMENT_STATUS } from '../shared/constants';
export interface IOrder {
    id: string;
    buyerId: string;
    sellerId: string;
    newsId: string;
    bookingDate: Date;
    orderStatus: ORDER_STATUS;
    paymentStatus: PAYMENT_STATUS;
    paymentTime: Date;
    createdAt: Date;
}
