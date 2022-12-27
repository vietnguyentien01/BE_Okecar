/// <reference types="multer" />
import { PaginationDto } from '../../shared/common/dto';
import { ScrapperService } from './craw-data.service';
export declare class CrawDataController {
    private crawService;
    constructor(crawService: ScrapperService);
    multipleCreateProjects(file: Express.Multer.File): Promise<void>;
    getNotification(query: PaginationDto): Promise<{
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
