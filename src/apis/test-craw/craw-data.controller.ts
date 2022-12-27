import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { PaginationDto } from '../../shared/common/dto'
import { ScrapperService } from './craw-data.service'

@Controller()
export class CrawDataController {
    constructor(private crawService: ScrapperService) {}

    @Post('/multiple-craw')
    @UseInterceptors(FileInterceptor('file'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async multipleCreateProjects(@UploadedFile() file: Express.Multer.File) {
        await this.crawService.multipleCreateProject(file)
    }

    @Get('/list-hotel')
    async getNotification(@Query() query: PaginationDto) {
        const args = {
            sort: { createdAt: -1 },
            pagination: query,
        }
        const notifications = await this.crawService.getList(args)
        return {
            data: notifications.data.map((notifications) => notifications),
            meta: notifications.meta,
        }
    }
}
