"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const terminus_1 = require("@nestjs/terminus");
const packageJson = require("../package.json");
let AppController = class AppController {
    constructor(health, mongoose) {
        this.health = health;
        this.mongoose = mongoose;
        console.log(`Start with version: ${packageJson.version}`);
    }
    check() {
        return this.health.check([
            async () => this.mongoose.pingCheck('mongoose'),
            async () => ({ apiVersion: packageJson.version }),
        ]);
    }
};
__decorate([
    common_1.Get('/health'),
    terminus_1.HealthCheck(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "check", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.MongooseHealthIndicator])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map