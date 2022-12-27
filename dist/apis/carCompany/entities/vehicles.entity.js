"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesEntity = void 0;
class VehiclesEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.carCompanyId = partial.carCompanyId;
            this.name = partial.name;
            this.createdAt = partial.createdAt;
        }
    }
}
exports.VehiclesEntity = VehiclesEntity;
//# sourceMappingURL=vehicles.entity.js.map