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
exports.AuthService = void 0;
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cache_service_1 = require("../../frameworks/cache-service/cache.service");
const mail_service_1 = require("../../frameworks/mail-service/mail-service");
const constants_1 = require("../../shared/constants");
const generate_code_1 = require("../../shared/helper/generate-code");
const validate_1 = require("../../shared/helper/validate");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    constructor(jwtService, redis, mailService, UserModel) {
        this.jwtService = jwtService;
        this.redis = redis;
        this.mailService = mailService;
        this.UserModel = UserModel;
    }
    async register(doc) {
        const email = validate_1.default.validateEmail(doc.email);
        const password = validate_1.default.validatePassword(doc.password);
        const [hash, user] = await mongoose_2.Promise.all([
            bcrypt.hash(password, 10),
            this.UserModel.findOne({ email: email }),
        ]);
        if (user) {
            throw new common_1.BadRequestException(constants_1.ERROR.DUPLICATE_USER);
        }
        try {
            const newUser = new this.UserModel(Object.assign(Object.assign({}, doc), { password: hash }));
            const user = await newUser.save();
            const payload = {
                user: {
                    _id: user.id,
                    time: new Date().getTime(),
                },
            };
            const token = this.jwtService.sign(payload);
            await this.redis.set(token, new user_entity_1.UserEntity(user), 48 * 3600);
            return {
                user: new user_entity_1.UserEntity(user),
                access_token: token,
            };
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
    }
    async login(doc) {
        const password = validate_1.default.validatePassword(doc.password);
        const user = await this.UserModel.findOne({
            userName: doc.userName,
        });
        if (!user) {
            throw new common_1.BadRequestException(constants_1.ERROR.CAN_NOT_FIND_USER);
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.BadRequestException(constants_1.ERROR.INVALID_PASSWORD);
        }
        const payload = {
            user: {
                _id: user.id,
                time: new Date().getTime(),
            },
        };
        const token = this.jwtService.sign(payload);
        await this.redis.set(token, new user_entity_1.UserEntity(user), 48 * 3600);
        return {
            user: new user_entity_1.UserEntity(user),
            access_token: token,
        };
    }
    async logout(token) {
        const user = await this.redis.get(token);
        await mongoose_2.Promise.all([
            this.redis.del(token),
            user ? this.redis.del(user.address) : null,
        ]);
    }
    async preRegister(doc) {
        const email = validate_1.default.validateEmail(doc.email);
        const user = await this.UserModel.findOne({
            email: email,
        });
        if (user) {
            throw new common_1.BadRequestException(constants_1.ERROR.DUPLICATE_USER);
        }
        const verifyCode = generate_code_1.default.create({
            length: 4,
            charset: '123456789',
        });
        const id = constants_1.COLLECTION.VERIFY_REGISTER + verifyCode + email;
        console.log(verifyCode);
        await mongoose_2.Promise.all([
            this.redis.set(id, id, constants_1.BASE_VALUE.TTL_ACCESS_TOKEN_REDIS),
            this.mailService.sendRegisterOTP(verifyCode, email),
        ]);
    }
    async verifyCodeRegister(doc) {
        const confirmCode = await this.redis.get(constants_1.COLLECTION.VERIFY_REGISTER + doc.code + doc.email);
        if (!confirmCode) {
            throw new common_1.BadRequestException(constants_1.ERROR.INVALID_OTP);
        }
        await mongoose_2.Promise.all([this.redis.del(confirmCode)]);
        return {
            success: true,
        };
    }
    async changePassWord(doc) {
        const password = validate_1.default.validatePassword(doc.oldPassword);
        const newPassword = validate_1.default.validatePassword(doc.newPassword);
        const user = await this.UserModel.findOne({
            email: doc.email,
        });
        if (!user) {
            throw new common_1.BadRequestException(constants_1.ERROR.CAN_NOT_FIND_USER);
        }
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            throw new common_1.BadRequestException(constants_1.ERROR.INVALID_PASSWORD);
        }
        const hash = await bcrypt.hash(newPassword, 10);
        await this.UserModel.updateOne({ email: user.email }, { password: hash });
    }
    async preForgotPass(doc) {
        const email = validate_1.default.validateEmail(doc.email);
        const user = await this.UserModel.findOne({
            email: email,
        });
        if (!user) {
            throw new common_1.BadRequestException(constants_1.ERROR.CAN_NOT_FIND_USER);
        }
        const verifyCode = generate_code_1.default.create({
            length: 4,
            charset: '123456789',
        });
        const id = constants_1.COLLECTION.FOR_GOT_PASS + verifyCode + email;
        console.log(verifyCode);
        await mongoose_2.Promise.all([
            this.redis.set(id, id, constants_1.BASE_VALUE.TTL_ACCESS_TOKEN_REDIS),
            this.mailService.sendForgetPass(verifyCode, email),
        ]);
    }
    async verifyCodeForgotPass(doc) {
        const confirmCode = await this.redis.get(constants_1.COLLECTION.FOR_GOT_PASS + doc.code + doc.email);
        if (!confirmCode) {
            throw new common_1.BadRequestException(constants_1.ERROR.INVALID_OTP);
        }
        await mongoose_2.Promise.all([this.redis.del(confirmCode)]);
        return {
            success: true,
        };
    }
    async resetPass(doc) {
        const newPassword = validate_1.default.validatePassword(doc.newPassword);
        const user = await this.UserModel.findOne({
            email: doc.email,
        });
        console.log(user);
        if (!user) {
            throw new common_1.BadRequestException(constants_1.ERROR.CAN_NOT_FIND_USER);
        }
        console.log(doc.newPassword);
        const hash = await bcrypt.hash(newPassword, 10);
        await this.UserModel.updateOne({ email: user.email }, { password: hash });
    }
};
AuthService = __decorate([
    common_1.Global(),
    common_1.Injectable(),
    __param(3, mongoose_1.InjectModel(constants_1.COLLECTION.USER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        cache_service_1.CacheService,
        mail_service_1.MailService,
        mongoose_2.Model])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map