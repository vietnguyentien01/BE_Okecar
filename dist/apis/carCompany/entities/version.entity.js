"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionEntity = void 0;
class VersionEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.vehiclesId = partial.vehiclesId;
            this.name = partial.name;
            this.createdAt = partial.createdAt;
        }
    }
}
exports.VersionEntity = VersionEntity;
//# sourceMappingURL=version.entity.js.map