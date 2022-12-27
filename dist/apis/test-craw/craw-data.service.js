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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const sync_1 = require("csv-parse/sync");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../shared/constants");
const craw_entity_1 = require("./entities/craw.entity");
let ScrapperService = class ScrapperService {
    constructor(CrawModel) {
        this.CrawModel = CrawModel;
    }
    async multipleCreateProject(file) {
        const projectDetailBulkInsert = await this.parseCsvToNftData(file);
        if (projectDetailBulkInsert.length > 0) {
            await this.CrawModel.bulkWrite(projectDetailBulkInsert, {
                ordered: false,
            }).catch((err) => {
                console.log(`Error when bulk insert projectDetails: ${err.message}`);
            });
        }
    }
    async parseCsvToNftData(file) {
        const parser = await sync_1.parse(file.buffer, {
            delimiter: ',',
            skip_empty_lines: true,
            columns: function (headers) {
                return headers;
            }.bind(this),
            encoding: 'utf8',
        });
        const craws = [];
        for (const craw of parser) {
            if (!!craw['address'] &&
                !!craw['image'] &&
                !!craw['url'] &&
                !!craw['name']) {
                craws.push({
                    insertOne: {
                        document: {
                            address: craw['address'],
                            image: craw['image'],
                            url: craw['url'],
                            reviews: !!craw['reviews']
                                ? parseInt(craw['reviews'])
                                : 0,
                            name: craw['name'],
                            rating: !!craw['rating']
                                ? parseInt(craw['rating'])
                                : 0,
                            stars: !!craw['stars']
                                ? parseInt(craw['stars'])
                                : 0,
                        },
                    },
                });
            }
        }
        return craws;
    }
    async getList(args) {
        const { limit, offset } = args.pagination;
        const craws = await this.CrawModel.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit);
        if (!craws) {
            throw new common_1.NotFoundException();
        }
        const [total] = await mongoose_2.Promise.all([this.CrawModel.count()]);
        return {
            data: craws.map((notification) => {
                return Object.assign({}, new craw_entity_1.CrawEntity(notification));
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        };
    }
};
ScrapperService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(constants_1.COLLECTION.CRAW)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ScrapperService);
exports.ScrapperService = ScrapperService;
//# sourceMappingURL=craw-data.service.js.map