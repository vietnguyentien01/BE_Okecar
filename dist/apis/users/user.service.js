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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cache_service_1 = require("../../frameworks/cache-service/cache.service");
const constants_1 = require("../../shared/constants");
let UserService = class UserService {
    constructor(UserModel, redis) {
        this.UserModel = UserModel;
        this.redis = redis;
    }
    async getOne(userId) {
        const user = await this.UserModel.findOne({ _id: userId });
        if (!user) {
            throw new common_1.NotFoundException(constants_1.ERROR.CAN_NOT_FIND_USER);
        }
        return user;
    }
    async updateUser(userId, doc) {
        const user = await this.UserModel.findByIdAndUpdate(userId, doc, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotAcceptableException();
        }
        return user;
    }
    async getListUser(args) {
        const { limit, offset } = args.pagination;
        const users = await this.UserModel.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!users) {
            throw new common_1.NotFoundException();
        }
        const total = await this.UserModel.count();
        return {
            data: users,
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        };
    }
    async updateOne(id, doc) {
        const user = await this.UserModel.findByIdAndUpdate(id, doc, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotAcceptableException();
        }
        return user;
    }
    async registerToStore(id, doc) {
        const user = await this.UserModel.findByIdAndUpdate(id, { role: constants_1.ROLE.STORE, storeInfo: doc }, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotAcceptableException();
        }
        return user;
    }
    async updateStore(id, doc) {
        const user = await this.UserModel.findByIdAndUpdate(id, { storeInfo: doc }, {
            new: true,
        });
        if (!user) {
            throw new common_1.NotAcceptableException();
        }
        return user;
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(constants_1.COLLECTION.USER)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cache_service_1.CacheService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map