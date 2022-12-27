import { MailerModule } from '@nestjs-modules/mailer'
// eslint-disable-next-line no-restricted-imports
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { Global, Module } from '@nestjs/common'
import { join } from 'path'

import { MailService } from './mail-service'

@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.sendgrid.net',
                auth: {
                    user: 'apikey',
                    pass: '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',
                },
            },
            template: {
                dir: join(__dirname, 'src/frameworks/mail-service'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
