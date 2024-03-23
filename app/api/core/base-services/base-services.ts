import nodemailer from 'nodemailer';
import { EmailTypes } from '../constant/enum';
export default class BaseServices {
    async sendEmailWithLogo(toEmail: string, otp: number, emailType: any) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'codelab918@gmail.com',
                pass: 'bcox eqzh azuy lsfi'
            }
        });

        let subject = '';
        let message = '';

        switch (emailType) {
            case EmailTypes.REGISTER:
                subject = 'Welcome to Our App!';
                message = `
          <p>Hello there,</p>
          <p>Welcome to our app! We're excited to have you join our community.</p>
          <p>To complete your registration, please use the following code:</p>
          <p><strong>OTP: ${otp}</strong></p>
          <p>This code is valid for one 10 minute. Please enter it in the app to verify your account.</p>
          <p>If you didn't register for our app, please ignore this email.</p>
          <p>Thank you for choosing us!</p>
          <p style="text-align: center;">
  </p>
        `;
                break;

            case EmailTypes.FORGET_PASSWORD:
                subject = 'Forget Password OTP';
                message = `
          <p>Hello there,</p>
          <p>We received a request to reset your password. Please use the following OTP to reset your password:</p>
          <p><strong>OTP: ${otp}</strong></p>
          <p>This OTP is valid for 10 minute. Please enter it in the app to proceed with resetting your password.</p>
          <p>If you didn't request a password reset, you can ignore this email.</p>
          <p>Thank you.</p>
          <p style="text-align: center;">
    // <img src="cid:logo" style="display: block; margin: 0 auto;">
  </p>
        `;
                break;

            case EmailTypes.CHANGE_PASSWORD:
                subject = 'Change Password OTP';
                message = `
          <p>Hello there,</p>
          <p>We received a request to change your password. Please use the following OTP to change your password:</p>
          <p><strong>OTP: ${otp}</strong></p>
          <p>This OTP is valid for 10 minute. Please enter it in the app to proceed with changing your password.</p>
          <p>If you didn't request a password change, you can ignore this email.</p>
          <p>Thank you.</p>
          <p style="text-align: center;">
    <img src="cid:logo" style="display: block; margin: 0 auto;">
  </p>
        `;
                break;

            default:
                // Default case
                break;
        }

        const mailOptions = {
            from: 'ads233ma@gmail.com',
            to: toEmail,
            subject: subject,
            // attachments: [
            //     {
            //         filename: 'logo.png',
            //         path: '/logo.png',
            //         cid: 'logo'
            //     }
            // ],
            html: message
        };

        await transporter.sendMail(mailOptions);
    }
}
