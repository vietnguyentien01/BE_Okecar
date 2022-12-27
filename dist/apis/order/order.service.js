"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../shared/constants");
const validate_data_1 = require("../../shared/helper/validate-data");
const notification_service_1 = require("../notification/notification.service");
const product_entity_1 = require("../product/entites/product.entity");
const user_entity_1 = require("../users/entities/user.entity");
const order_entity_1 = require("./entities/order.entity");
let OrderService = class OrderService {
    constructor(OrderModel, ProductModel, UserModel, notificationService) {
        this.OrderModel = OrderModel;
        this.ProductModel = ProductModel;
        this.UserModel = UserModel;
        this.notificationService = notificationService;
    }
    async createOrder(buyerId, productId, doc) {
        const [product, buyer] = await mongoose_2.Promise.all([
            this.ProductModel.findById(productId),
            this.UserModel.findById(buyerId),
        ]);
        validate_data_1.default.validateDataNotFound(product);
        if (product.status !== constants_1.STATUS.APPROVED) {
            throw new common_1.NotAcceptableException(constants_1.ERROR.ACCESS_DENIED);
        }
        await new this.OrderModel(Object.assign(Object.assign({}, doc), { buyerId: buyerId, sellerId: product.userId, newsId: productId })).save();
        await mongoose_2.Promise.all([
            this.notificationService.createNotification({
                type: constants_1.NOTIFY_TYPE.BOOKING,
                objectId: product.id,
                userId: buyerId,
                title: 'Bạn đã đặt lịch xem xe thành công',
                message: 'Nếu không phải là hành động của bạn, xin vui lòng liên hệ',
                projectId: product.id,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: constants_1.NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: product.id,
                userId: product.userId,
                title: `Bạn đã nhận được 1 lịch đặt hẹn xe từ người dùng ${buyer.userName} có Số điện thoại ${buyer.phone}`,
                message: 'Vui lòng sắp xếp thời gian để giao dịch',
                projectId: product.id,
                fromId: buyerId,
                uniqueKey: '',
            }),
            this.ProductModel.findByIdAndUpdate(productId, {
                status: constants_1.STATUS.CONFIRMING,
            }),
        ]);
    }
    async getList(args, options) {
        console.log(options);
        const { limit, offset } = args.pagination;
        const queries = this.pickQueries(options);
        const orders = await this.OrderModel.find(queries)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!orders) {
            throw new common_1.NotFoundException();
        }
        const productTerms = [];
        const userBuyerTerm = [];
        const userSellerTerm = [];
        for (const order of orders) {
            productTerms.push({ id: order.newsId });
            userBuyerTerm.push({ id: order.buyerId });
            userSellerTerm.push({ id: order.sellerId });
        }
        const [total, products, buyers, sellers] = await mongoose_2.Promise.all([
            this.OrderModel.count(queries),
            this.ProductModel.find({ productTerms }),
            this.UserModel.find({ userBuyerTerm }),
            this.UserModel.find({ userSellerTerm }),
        ]);
        return {
            data: orders.map((order) => {
                const product = this.filterTypeObject(products, order.newsId);
                const buyer = this.filterTypeObject(buyers, product.buyerId);
                const seller = this.filterTypeObject(sellers, product.sellerId);
                return Object.assign(Object.assign({}, new order_entity_1.OrderEntity(order)), { product: new product_entity_1.ProductEntity(product), buyer: new user_entity_1.UserEntity(buyer), seller: new user_entity_1.UserEntity(seller) });
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        };
    }
    pickQueries(options) {
        const queries = {};
        (options === null || options === void 0 ? void 0 : options.buyerId) &&
            Object.assign(queries, {
                buyerId: options.buyerId,
            });
        (options === null || options === void 0 ? void 0 : options.sellerId) &&
            Object.assign(queries, {
                sellerId: options.sellerId,
            });
        (options === null || options === void 0 ? void 0 : options.status) &&
            Object.assign(queries, {
                orderStatus: options.status,
            });
        return queries;
    }
    filterTypeObject(data, objectId) {
        if (data.length) {
            return data.find((r) => r.id === objectId);
        }
    }
    async confirmOrder(id, ownerId) {
        const order = await this.OrderModel.findOneAndUpdate({ newsId: id, sellerId: ownerId }, { orderStatus: constants_1.ORDER_STATUS.DONE });
        validate_data_1.default.validateDataNotFound(order);
        await mongoose_2.Promise.all([
            this.notificationService.createNotification({
                type: constants_1.NOTIFY_TYPE.BOOKING,
                objectId: order.id,
                userId: order.buyerId,
                title: 'Giao dịch thành công',
                message: 'Bạn đã mua xe thành công ! Chúc mừng bạn',
                projectId: order.newsId,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: constants_1.NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: order.id,
                userId: order.sellerId,
                title: `Xe của bạn đã được bán thành công!`,
                message: 'Cảm ởn bạn đã sử dụng dịch vụ',
                projectId: order.newsId,
                fromId: order.buyerId,
                uniqueKey: '',
            }),
            this.ProductModel.findByIdAndUpdate(order.newsId, {
                status: constants_1.STATUS.DONE,
            }),
        ]);
    }
    async cancelOrder(id, ownerId) {
        const order = await this.OrderModel.findOneAndUpdate({ newsId: id, sellerId: ownerId }, { orderStatus: constants_1.ORDER_STATUS.CANCEL });
        validate_data_1.default.validateDataNotFound(order);
        if (order.orderStatus === constants_1.ORDER_STATUS.DONE) {
            throw new common_1.BadRequestException();
        }
        await mongoose_2.Promise.all([
            this.notificationService.createNotification({
                type: constants_1.NOTIFY_TYPE.BOOKING,
                objectId: order.id,
                userId: order.buyerId,
                title: 'Giao dịch không thành công',
                message: 'Người bán đã từ chối lịch hẹn của bạn. Vui lòng liên hệ lại',
                projectId: order.newsId,
                fromId: '',
                uniqueKey: '',
            }),
            this.notificationService.createNotification({
                type: constants_1.NOTIFY_TYPE.RECEIVE_ORDER,
                objectId: order.id,
                userId: order.sellerId,
                title: `Bạn đã từ chối lịch hẹn!`,
                message: 'Cảm ởn bạn đã sử dụng dịch vụ',
                projectId: order.newsId,
                fromId: order.buyerId,
                uniqueKey: '',
            }),
            this.ProductModel.findByIdAndUpdate(order.newsId, {
                status: constants_1.STATUS.APPROVED,
            }),
        ]);
    }
};
OrderService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(constants_1.COLLECTION.ORDER)),
    __param(1, mongoose_1.InjectModel(constants_1.COLLECTION.PRODUCTS)),
    __param(2, mongoose_1.InjectModel(constants_1.COLLECTION.USER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map