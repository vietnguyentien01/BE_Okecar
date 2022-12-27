import { FilterQuery, Model } from 'mongoose';
import { IListRequest } from '../../shared/common/interfaces';
import { ORDER_STATUS } from '../../shared/constants';
import { NotificationService } from '../notification/notification.service';
import { ProductEntity } from '../product/entites/product.entity';
import { Product } from '../product/model/product.schema';
import { UserEntity } from '../users/entities/user.entity';
import { User } from '../users/model/user.schema';
import { FilterOrder } from './dto/filter-order';
import { OrderDto } from './dto/order.dto';
import { Order } from './model/order.schema';
export declare class OrderService {
    private readonly OrderModel;
    private readonly ProductModel;
    private readonly UserModel;
    private readonly notificationService;
    constructor(OrderModel: Model<Order>, ProductModel: Model<Product>, UserModel: Model<User>, notificationService: NotificationService);
    createOrder(buyerId: string, productId: string, doc: OrderDto): Promise<void>;
    getList(args: IListRequest, options?: FilterOrder): Promise<{
        data: {
            product: ProductEntity;
            buyer: UserEntity;
            seller: UserEntity;
            id: string;
            buyerId: string;
            sellerId: string;
            newsId: string;
            bookingDate: Date;
            orderStatus: ORDER_STATUS;
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
    pickQueries(options?: FilterOrder): FilterQuery<Order>;
    filterTypeObject(data: any[], objectId: string): any;
    confirmOrder(id: string, ownerId: string): Promise<void>;
    cancelOrder(id: string, ownerId: string): Promise<void>;
}
