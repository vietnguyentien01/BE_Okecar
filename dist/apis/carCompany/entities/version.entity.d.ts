import { IVersion } from '../../../interfaces/version.interface';
import { Version } from '../model/version.schema';
export interface VersionEntity extends IVersion {
}
export declare class VersionEntity {
    constructor(partial: Partial<Version>);
}
