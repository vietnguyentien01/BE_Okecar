import { MailerService } from '@nestjs-modules/mailer'
import { Global, ServiceUnavailableException } from '@nestjs/common'
import { env } from 'configs'

@Global()
export class MailService {
    constructor(private mailService: MailerService) {}
    async sendStaffEmail(verifyCode: string, email: string, role: string) {
        try {
            let html = `<div>`
            html += `<p>Xin chào ${role},</p>`
            html += `<h4>Pass code login là:</h4>`
            html += `<h3>${verifyCode}</h3>`
            html += `<p>Vui lòng không chia sẻ mật khẩu này với bất cứ ai.</p>`
            html += `<div>Trân trọng,`
            html += `<br />Sotviet Developer Team</br>`
            html += `</div>`

            await this.mailService.sendMail({
                to: email,
                from: 'sotvietdev@gmail.com',
                subject: `[${env}] Sotviet`,
                text: 'confirl code',
                html: html,
            })
        } catch (e) {
            console.log('sendStaffEmail', e.message)
            throw new ServiceUnavailableException(e)
        }
    }

    async sendRegisterOTP(verifyCode: string, email: string) {
        try {
            let html = `<div>`
            html += `<p>Xin chào ${email},</p>`
            html += `<h4>Mã OTP đăng kí của quý khách là:</h4>`
            html += `<h3>${verifyCode}</h3>`
            html += `<p>Vui lòng không chia sẻ mật khẩu này với bất cứ ai.</p>`
            html += `<div>Trân trọng,`
            html += `<br />OkeCar Developer Team</br>`
            html += `</div>`

            await this.mailService.sendMail({
                to: email,
                from: 'sotvietdev@gmail.com',
                subject: `[${env}] Sotviet`,
                text: 'confirl code',
                html: html,
            })
        } catch (e) {
            console.log('sendStaffEmail', e.message)
            throw new ServiceUnavailableException(e)
        }
    }

    async sendForgetPass(verifyCode: string, email: string) {
        try {
            let html = `<div>`
            html += `<p>Xin chào ${email},</p>`
            html += `<h4>Mã OTP Quên mật khẩu của quý khách là:</h4>`
            html += `<h3>${verifyCode}</h3>`
            html += `<p>Vui lòng không chia sẻ mật khẩu này với bất cứ ai.</p>`
            html += `<div>Trân trọng,`
            html += `<br />OkeCar Developer Team</br>`
            html += `</div>`

            await this.mailService.sendMail({
                to: email,
                from: 'sotvietdev@gmail.com',
                subject: `[${env}] Sotviet`,
                text: 'confirl code',
                html: html,
            })
        } catch (e) {
            console.log('sendStaffEmail', e.message)
            throw new ServiceUnavailableException(e)
        }
    }

    async sendNewOrder() {
        try {
            let html = `<div>`
            html += `<p>Xin chào Admin</p>`
            html += `<h4>Bạn có đơn hàng mới cần xử lý :</h4>`
            html += `<h3 style="color:blue;">Mã đơn hàng là: 6302e362124f316a66e7d927</h3>`
            html += `<textarea rows="2"cols="50">Vui lòng xử lý đơn hàng trong khoảng thời gian 30 phút</textarea>`
            html += `<div>Trân trọng,`
            html += `<br />Sotviet Developer Team</br>`
            html += `</div>`

            await this.mailService.sendMail({
                to: 'huy.1cloudtech@gmail.com',
                from: 'sotvietdev@gmail.com',
                subject: `[${env}] Bạn có đơn hàng mới cần xử lý`,
                text: 'Welcome NestJS Email Sending Tutorial',
                html: html,
            })
        } catch (e) {
            console.log('sendStaffEmail', e.message)
            throw new ServiceUnavailableException(e)
        }
    }
}
