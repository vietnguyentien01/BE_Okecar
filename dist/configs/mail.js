"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailConfig = void 0;
const dotEnv = require("dotenv");
dotEnv.config();
exports.MailConfig = {
    apiKey: process.env.SENDGRID_API_KEY,
};
//# sourceMappingURL=mail.js.map