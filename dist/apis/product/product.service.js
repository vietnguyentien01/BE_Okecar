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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../shared/constants");
const validate_data_1 = require("../../shared/helper/validate-data");
const car_company_entity_1 = require("../carCompany/entities/car-company.entity");
const notification_service_1 = require("../notification/notification.service");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("./entites/product.entity");
let ProductService = class ProductService {
    constructor(ProductModel, CarCompanyModel, UserModel, notificationService) {
        this.ProductModel = ProductModel;
        this.CarCompanyModel = CarCompanyModel;
        this.UserModel = UserModel;
        this.notificationService = notificationService;
    }
    async createProduct(doc, userId) {
        doc.userId = userId;
        const [user, carCompany] = await mongoose_2.Promise.all([
            this.UserModel.findById(userId),
            this.CarCompanyModel.findById(doc.carCompanyId),
        ]);
        validate_data_1.default.validateDataNotFound(user, constants_1.ERROR.CAN_NOT_FIND_USER);
        validate_data_1.default.validateDataNotFound(carCompany, constants_1.ERROR.CAN_NOT_CAR_COMPANY);
        const car = new this.ProductModel(doc);
        this.notificationService.createNotification({
            type: constants_1.NOTIFY_TYPE.REVIEW_PRODUCTS,
            objectId: car._id,
            userId: userId,
            title: 'Tin của bạn đã đăng thành công!',
            message: 'Vui lòng chờ chúng tôi xét duyệt trong ít phút',
            projectId: car._id,
            fromId: '',
            uniqueKey: '',
        });
        await car.save();
    }
    async getList(args, options) {
        const { limit, offset } = args.pagination;
        const queries = this.pickQueries(options);
        const products = await this.ProductModel.find(queries)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!products) {
            throw new common_1.NotFoundException();
        }
        const companyTerm = [];
        const userTerm = [];
        for (const product of products) {
            companyTerm.push({ id: product.carCompanyId });
            userTerm.push({ id: product.userId });
        }
        const [total, carCompanys, users] = await mongoose_2.Promise.all([
            this.ProductModel.count(queries),
            this.CarCompanyModel.find({ companyTerm }),
            this.UserModel.find({ userTerm }),
        ]);
        return {
            data: products.map((product) => {
                const company = this.filterTypeObject(carCompanys, product.carCompanyId);
                const user = this.filterTypeObject(users, product.userId);
                return Object.assign(Object.assign({}, new product_entity_1.ProductEntity(product)), { company: new car_company_entity_1.CarCompanyEntity(company), user: new user_entity_1.UserEntity(user) });
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
        (options === null || options === void 0 ? void 0 : options.status) &&
            Object.assign(queries, {
                status: {
                    $regex: new RegExp(`${options.status}`),
                    $options: 'i',
                },
            });
        (options === null || options === void 0 ? void 0 : options.keyword) &&
            Object.assign(queries, {
                title: {
                    $regex: new RegExp(`${options.keyword}`),
                    $options: 'i',
                },
            });
        (options === null || options === void 0 ? void 0 : options.carCompanyId) &&
            Object.assign(queries, {
                carCompanyId: options.carCompanyId,
            });
        (options === null || options === void 0 ? void 0 : options.origin) &&
            Object.assign(queries, {
                origin: options.origin,
            });
        (options === null || options === void 0 ? void 0 : options.carStatus) &&
            Object.assign(queries, {
                carStatus: options.carStatus,
            });
        (options === null || options === void 0 ? void 0 : options.userId) &&
            Object.assign(queries, {
                userId: options.userId,
            });
        (options === null || options === void 0 ? void 0 : options.status) &&
            Object.assign(queries, {
                status: options.status,
            });
        return queries;
    }
    async updateProductStatus(id, status) {
        const product = await this.ProductModel.findByIdAndUpdate(id, {
            status: status,
        }, {
            new: true,
        });
        validate_data_1.default.validateDataNotFound(product, constants_1.ERROR.CAN_NOT_FIND_PRODUCT);
        this.notificationService.createNotification({
            type: constants_1.NOTIFY_TYPE.REVIEW_PRODUCTS,
            objectId: product.id,
            userId: product.userId,
            title: product.status === constants_1.STATUS.APPROVED
                ? 'Tin của bạn đã duyệt thành công thành công!'
                : 'Tin của bạn đã bị từ chối!',
            message: product.status === constants_1.STATUS.APPROVED
                ? 'Tin bạn đã được đăng thành công'
                : 'Xin vui lòng kiểm tra lại các thông tin',
            projectId: product.id,
            fromId: '',
            uniqueKey: '',
        });
        return product;
    }
    async getOne(id) {
        const product = await this.ProductModel.findById(id);
        validate_data_1.default.validateDataNotFound(product, constants_1.ERROR.CAN_NOT_FIND_DATA);
        const [carCompanys, users] = await mongoose_2.Promise.all([
            this.CarCompanyModel.findById(product.carCompanyId),
            this.UserModel.findById(product.userId),
        ]);
        return Object.assign(Object.assign({}, new product_entity_1.ProductEntity(product)), { company: new car_company_entity_1.CarCompanyEntity(carCompanys), user: new user_entity_1.UserEntity(users) });
    }
    filterTypeObject(data, objectId) {
        if (data.length) {
            return data.find((r) => r.id === objectId);
        }
    }
};
ProductService = __decorate([
    common_1.Global(),
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(constants_1.COLLECTION.PRODUCTS)),
    __param(1, mongoose_1.InjectModel(constants_1.COLLECTION.CAR_COMPANY)),
    __param(2, mongoose_1.InjectModel(constants_1.COLLECTION.USER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        notification_service_1.NotificationService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map