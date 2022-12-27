"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
class Validator {
    static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.toLowerCase())) {
            throw new common_1.BadRequestException();
        }
        return email.toLowerCase();
    }
    static validatePhone(phone) {
        const phoneRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!phoneRe.test(phone) || phone.length >= 12 || phone.length < 10) {
            throw new common_1.BadRequestException(constants_1.ERROR.INVALID_PHONE);
        }
        return phone;
    }
    static validatePassword(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/;
        if (!re.test(password)) {
            throw new common_1.BadRequestException(constants_1.ERROR.INVALID_PASSWORD);
        }
        return password;
    }
}
exports.default = Validator;
//# sourceMappingURL=validate.js.map