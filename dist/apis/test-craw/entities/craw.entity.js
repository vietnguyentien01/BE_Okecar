"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawEntity = void 0;
class CrawEntity {
    constructor(partial) {
        if (partial) {
            this.id = partial._id ? partial._id.toString() : partial.id;
            this.name = partial.name;
            this.address = partial.address;
            this.image = partial.image;
            this.url = partial.url;
            this.rating = partial.rating;
            this.reviews = partial.reviews;
            this.stars = partial.stars;
            this.createdAt = partial.createdAt;
        }
    }
}
exports.CrawEntity = CrawEntity;
//# sourceMappingURL=craw.entity.js.map