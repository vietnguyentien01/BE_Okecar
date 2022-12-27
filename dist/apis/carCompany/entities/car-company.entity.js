"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarCompanyEntity = void 0;
class CarCompanyEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.avatar = partial.avatar;
            this.name = partial.name;
            this.createdAt = partial.createdAt;
        }
    }
}
exports.CarCompanyEntity = CarCompanyEntity;
//# sourceMappingURL=car-company.entity.js.map