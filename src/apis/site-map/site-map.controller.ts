import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common'
import { Response } from 'express'

import { StorageService } from '../storage/storage.service'

@Controller('site-map')
export class SiteMapController {
    constructor(private storageService: StorageService) {}

    @Post()
    @HttpCode(HttpStatus.NO_CONTENT)
    async createSiteMap() {
        await this.storageService.createSiteMap()
    }

    @Get('/:key')
    async getSitemap(@Param('key') key: string, @Res() res: Response) {
        this.storageService
            .getFile(key)
            .then((data) => {
                res.writeHead(200, { 'Content-Type': 'application/xml' })
                res.write(data.Body, 'binary')
                res.end(null, 'binary')
            })
            .catch(() => {
                res.sendStatus(404)
            })
    }
}
