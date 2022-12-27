"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = void 0;
class FileEntity {
    constructor(partial) {
        if (partial) {
            this.url = partial.url;
            this.width = partial.width;
            this.height = partial.height;
        }
    }
}
exports.FileEntity = FileEntity;
//# sourceMappingURL=file.entity.js.map