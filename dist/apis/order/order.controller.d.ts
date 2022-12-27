import { PaginationDto } from '../../shared/common/dto';
import { RequestInfoType } from '../../shared/common/types';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(productId: string, doc: OrderDto, ctx: RequestInfoType): Promise<void>;
    getList(query: PaginationDto, buyerId: string, sellerId: string, status: string): Promise<{
        data: {
            product: import("../product/entites/product.entity").ProductEntity;
            buyer: import("../users/entities/user.entity").UserEntity;
            seller: import("../users/entities/user.entity").UserEntity;
            id: string;
            buyerId: string;
            sellerId: string;
            newsId: string;
            bookingDate: Date;
            orderStatus: import("../../shared/constants").ORDER_STATUS;
            paymentStatus: import("../../shared/constants").PAYMENT_STATUS;
            paymentTime: Date;
            createdAt: Date;
        }[];
        meta: {
            limit: number;
            offset: number;
            total: any;
            totalPages: number;
        };
    }>;
    confirmOrder(id: string, ctx: RequestInfoType): Promise<void>;
    cancelOrder(id: string, ctx: RequestInfoType): Promise<void>;
}
