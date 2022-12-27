"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteMapModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const site_map_controller_1 = require("./site-map.controller");
let SiteMapModule = class SiteMapModule {
};
SiteMapModule = __decorate([
    common_1.Module({
        imports: [jwt_1.JwtModule.register({}), common_1.HttpModule],
        controllers: [site_map_controller_1.SiteMapController],
    })
], SiteMapModule);
exports.SiteMapModule = SiteMapModule;
//# sourceMappingURL=site-map.module.js.map