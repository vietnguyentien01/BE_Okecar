/// <reference types="multer" />
import { Response } from 'express';
import { FileEntity } from './entities/file.entity';
import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadImage(file: Express.Multer.File): Promise<FileEntity>;
    getImage(key: string, res: Response): Promise<void>;
}
