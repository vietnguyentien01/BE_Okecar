import { ICraw } from '../../../interfaces/craw.interface';
import { CrawModel } from '../models/craw-model';
export interface CrawEntity extends ICraw {
}
export declare class CrawEntity {
    constructor(partial: Partial<CrawModel>);
}
