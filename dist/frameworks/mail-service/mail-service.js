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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const configs_1 = require("../../configs");
let MailService = class MailService {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendStaffEmail(verifyCode, email, role) {
        try {
            let html = `<div>`;
            html += `<p>Xin chào ${role},</p>`;
            html += `<h4>Pass code login là:</h4>`;
            html += `<h3>${verifyCode}</h3>`;
            html += `<p>Vui lòng không chia sẻ mật khẩu này với bất cứ ai.</p>`;
            html += `<div>Trân trọng,`;
            html += `<br />Sotviet Developer Team</br>`;
            html += `</div>`;
            await this.mailService.sendMail({
                to: email,
                from: 'sotvietdev@gmail.com',
                subject: `[${configs_1.env}] Sotviet`,
                text: 'confirl code',
                html: html,
            });
        }
        catch (e) {
            console.log('sendStaffEmail', e.message);
            throw new common_1.ServiceUnavailableException(e);
        }
    }
    async sendRegisterOTP(verifyCode, email) {
        try {
            let html = `<div>`;
            html += `<p>Xin chào ${email},</p>`;
            html += `<h4>Mã OTP đăng kí của quý khách là:</h4>`;
            html += `<h3>${verifyCode}</h3>`;
            html += `<p>Vui lòng không chia sẻ mật khẩu này với bất cứ ai.</p>`;
            html += `<div>Trân trọng,`;
            html += `<br />OkeCar Developer Team</br>`;
            html += `</div>`;
            await this.mailService.sendMail({
                to: email,
                from: 'sotvietdev@gmail.com',
                subject: `[${configs_1.env}] Sotviet`,
                text: 'confirl code',
                html: html,
            });
        }
        catch (e) {
            console.log('sendStaffEmail', e.message);
            throw new common_1.ServiceUnavailableException(e);
        }
    }
    async sendForgetPass(verifyCode, email) {
        try {
            let html = `<div>`;
            html += `<p>Xin chào ${email},</p>`;
            html += `<h4>Mã OTP Quên mật khẩu của quý khách là:</h4>`;
            html += `<h3>${verifyCode}</h3>`;
            html += `<p>Vui lòng không chia sẻ mật khẩu này với bất cứ ai.</p>`;
            html += `<div>Trân trọng,`;
            html += `<br />OkeCar Developer Team</br>`;
            html += `</div>`;
            await this.mailService.sendMail({
                to: email,
                from: 'sotvietdev@gmail.com',
                subject: `[${configs_1.env}] Sotviet`,
                text: 'confirl code',
                html: html,
            });
        }
        catch (e) {
            console.log('sendStaffEmail', e.message);
            throw new common_1.ServiceUnavailableException(e);
        }
    }
    async sendNewOrder() {
        try {
            let html = `<div>`;
            html += `<p>Xin chào Admin</p>`;
            html += `<h4>Bạn có đơn hàng mới cần xử lý :</h4>`;
            html += `<h3 style="color:blue;">Mã đơn hàng là: 6302e362124f316a66e7d927</h3>`;
            html += `<textarea rows="2"cols="50">Vui lòng xử lý đơn hàng trong khoảng thời gian 30 phút</textarea>`;
            html += `<div>Trân trọng,`;
            html += `<br />Sotviet Developer Team</br>`;
            html += `</div>`;
            await this.mailService.sendMail({
                to: 'huy.1cloudtech@gmail.com',
                from: 'sotvietdev@gmail.com',
                subject: `[${configs_1.env}] Bạn có đơn hàng mới cần xử lý`,
                text: 'Welcome NestJS Email Sending Tutorial',
                html: html,
            });
        }
        catch (e) {
            console.log('sendStaffEmail', e.message);
            throw new common_1.ServiceUnavailableException(e);
        }
    }
};
MailService = __decorate([
    common_1.Global(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail-service.js.map