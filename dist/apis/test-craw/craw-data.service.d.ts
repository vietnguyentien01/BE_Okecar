/// <reference types="multer" />
import { Model } from 'mongoose';
import { IListRequest } from '../../shared/common/interfaces';
import { CrawModel } from './models/craw-model';
export declare class ScrapperService {
    private readonly CrawModel;
    constructor(CrawModel: Model<CrawModel>);
    multipleCreateProject(file: Express.Multer.File): Promise<void>;
    parseCsvToNftData(file: Express.Multer.File): Promise<any[]>;
    getList(args: IListRequest): Promise<{
        data: {
            id: string;
            name: string;
            address: string;
            image: string;
            url: string;
            stars: number;
            reviews: number;
            rating: number;
            createdAt: Date;
        }[];
        meta: {
            limit: number;
            offset: number;
            total: any;
            totalPages: number;
        };
    }>;
}
