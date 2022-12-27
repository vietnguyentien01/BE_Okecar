import { IFile } from '../../../interfaces/file';
import { File } from '../model/file.schema';
export interface FileEntity extends IFile {
}
export declare class FileEntity {
    constructor(partial: Partial<File>);
}
