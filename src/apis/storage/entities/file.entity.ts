import { IFile } from '../../../interfaces/file'
import { File } from '../model/file.schema'

// eslint-disable-next-line
export interface FileEntity extends IFile {}

export class FileEntity {
    constructor(partial: Partial<File>) {
        if (partial) {
            this.url = partial.url
            this.width = partial.width
            this.height = partial.height
        }
    }
}
