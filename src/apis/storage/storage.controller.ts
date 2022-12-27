import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Express, Response } from 'express'

import { BASE_VALUE } from 'shared/constants'

import { AuthGuard } from '../../plugins/guards'
import { FileEntity } from './entities/file.entity'
import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    // @UseGuards(AuthGuard)
    @Post('/image')
    @UseInterceptors(
        FileInterceptor('image', {
            limits: { fileSize: BASE_VALUE.LIMIT_IMAGE_SIZE },
        })
    )
    @HttpCode(HttpStatus.CREATED)
    async uploadImage(
        @UploadedFile() file: Express.Multer.File
    ): Promise<FileEntity> {
        const image = await this.storageService.uploadImage(file)
        return new FileEntity(image)
    }

    @Get('/image/:key')
    async getImage(@Param('key') key: string, @Res() res: Response) {
        this.storageService
            .getImage(key)
            .then((data) => {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                res.write(data.Body, 'binary')
                res.end(null, 'binary')
            })
            .catch(() => {
                res.sendStatus(404)
            })
    }
}
