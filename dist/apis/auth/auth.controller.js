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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const register_input_1 = require("./dto/register-input");
const login_response_entity_1 = require("./entities/login-response.entity");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(doc) {
        const result = await this.authService.register(doc);
        return new login_response_entity_1.LoginVerifyResponseEntity(result);
    }
    async logout(ctx) {
        await this.authService.logout(ctx.headers.authorization);
    }
    async preRegister(doc) {
        await this.authService.preRegister(doc);
    }
    async confirmOTP(doc) {
        await this.authService.verifyCodeRegister(doc);
    }
    async login(doc) {
        const result = await this.authService.login(doc);
        return new login_response_entity_1.LoginVerifyResponseEntity(result);
    }
    async changePass(doc) {
        await this.authService.changePassWord(doc);
    }
    async preForgotPass(doc) {
        await this.authService.preForgotPass(doc);
    }
    async confirmOTPForGet(doc) {
        await this.authService.verifyCodeForgotPass(doc);
    }
    async resetPass(doc) {
        await this.authService.resetPass(doc);
    }
};
__decorate([
    common_1.Post('/confirm-register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_input_1.RegisterInput]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    common_1.Post('/logout'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    common_1.Post('/pre-register'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PreRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "preRegister", null);
__decorate([
    common_1.Post('/verify-otp'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VerifyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmOTP", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    common_1.Post('/change-password'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ChangePassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePass", null);
__decorate([
    common_1.Post('/pre-forgot-pass'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PreRegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "preForgotPass", null);
__decorate([
    common_1.Post('/verify-otp-forget'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VerifyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmOTPForGet", null);
__decorate([
    common_1.Post('/reset-password'),
    common_1.HttpCode(common_1.HttpStatus.NO_CONTENT),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.forgotPass]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPass", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map