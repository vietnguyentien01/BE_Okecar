"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderEntity = void 0;
class OrderEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.buyerId = partial.buyerId;
            this.sellerId = partial.sellerId;
            this.orderStatus = partial.orderStatus;
            this.bookingDate = partial.bookingDate;
            this.paymentStatus = partial.paymentStatus;
            this.createdAt = partial.createdAt;
        }
    }
}
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map