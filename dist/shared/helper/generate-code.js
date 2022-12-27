"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CodeGenerator = require("voucher-code-generator");
class GenerateCode {
    static create(option) {
        const { length, charset } = option;
        return CodeGenerator.generate({
            length,
            count: 1,
            charset,
        })[0];
    }
}
exports.default = GenerateCode;
//# sourceMappingURL=generate-code.js.map