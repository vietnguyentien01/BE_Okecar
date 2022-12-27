import { Response } from 'express';
import { StorageService } from '../storage/storage.service';
export declare class SiteMapController {
    private storageService;
    constructor(storageService: StorageService);
    createSiteMap(): Promise<void>;
    getSitemap(key: string, res: Response): Promise<void>;
}
