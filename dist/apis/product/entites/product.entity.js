"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
class ProductEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.title = partial.title;
            this.price = partial.price;
            this.year = partial.year;
            this.carCompanyId = partial.carCompanyId;
            this.videoLink = partial.videoLink;
            this.versionName = partial.versionName;
            this.carStatus = partial.carStatus;
            this.origin = partial.origin;
            this.gear = partial.gear;
            this.fuel = partial.fuel;
            this.color = partial.color;
            this.nameSeller = partial.nameSeller;
            this.phoneSeller = partial.phoneSeller;
            this.addressSeller = partial.addressSeller;
            this.kilometers = partial.kilometers;
            this.vehicleQuality = partial.vehiclesId;
            this.description = partial.description;
            this.location = partial.location;
            this.userId = partial.userId;
            this.avatar = partial.avatar;
            this.status = partial.status;
            this.createdAt = partial.createdAt;
        }
    }
}
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map