"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class ValidateData {
    static validateDataNotFound(data, error) {
        if (!data) {
            throw new common_1.NotFoundException(error);
        }
    }
}
exports.default = ValidateData;
//# sourceMappingURL=validate-data.js.map