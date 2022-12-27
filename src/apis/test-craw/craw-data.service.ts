import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { parse } from 'csv-parse/sync'
import { Model, Promise } from 'mongoose'

import { IListRequest } from '../../shared/common/interfaces'
import { COLLECTION } from '../../shared/constants'
import { NotificationEntity } from '../notification/entities/notification.entity'
import { CrawModel } from './models/craw-model'
import { CrawEntity } from "./entities/craw.entity";

@Injectable()
export class ScrapperService {
    constructor(
        @InjectModel(COLLECTION.CRAW)
        private readonly CrawModel: Model<CrawModel>
    ) {}

    async multipleCreateProject(file: Express.Multer.File) {
        const projectDetailBulkInsert = await this.parseCsvToNftData(file)
        if (projectDetailBulkInsert.length > 0) {
            await this.CrawModel.bulkWrite(projectDetailBulkInsert, {
                ordered: false,
            }).catch((err) => {
                console.log(
                    `Error when bulk insert projectDetails: ${err.message}`
                )
            })
        }
    }

    async parseCsvToNftData(file: Express.Multer.File) {
        const parser = await parse(file.buffer, {
            delimiter: ',',
            skip_empty_lines: true,
            columns: function (headers) {
                return headers
            }.bind(this),
            encoding: 'utf8',
        })

        const craws = []
        for (const craw of parser) {
            if (
                !!craw['address'] &&
                !!craw['image'] &&
                !!craw['url'] &&
                !!craw['name']
            ) {
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
                })
            }
        }
        return craws
    }

    async getList(args: IListRequest) {
        const { limit, offset } = args.pagination
        const craws = await this.CrawModel.find({})
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset * limit)

        if (!craws) {
            throw new NotFoundException()
        }

        const [total] = await Promise.all([this.CrawModel.count()])
        return {
            data: craws.map((notification) => {
                return {
                    ...new CrawEntity(notification),
                }
            }),
            meta: {
                limit: limit,
                offset: offset,
                total: total,
                totalPages: Math.ceil(total / args.pagination.limit),
            },
        }
    }
}
