"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginVerifyResponseEntity = void 0;
class LoginVerifyResponseEntity {
    constructor(partial) {
        if (partial) {
            this.user = partial.user;
            this.access_token = partial.access_token;
        }
    }
}
exports.LoginVerifyResponseEntity = LoginVerifyResponseEntity;
//# sourceMappingURL=login-response.entity.js.map