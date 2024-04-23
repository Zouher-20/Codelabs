import BaseResponse from '@/app/api/core/base-response/base-response';
import BaseServices from '@/app/api/core/base-services/base-services';
import { EmailTypes } from '@/app/api/core/constant/enum';
import { db } from '@/app/api/core/db/db';
import { NextResponse } from 'next/server';

import { z } from 'zod';
import VerifiedValidator from '../../../verified/services/validator/validation';

const services = new BaseServices();

class VeryfiedRepository {
    //TODO***************************
    async sendOtp(emailTypes: any, email: any) {
        var otp = Math.floor(100000 + Math.random() * 900000);
        if (emailTypes === EmailTypes.CHANGE_PASSWORD) {
            if (!email) {
                return BaseResponse.returnResponse({
                    statusCode: 400,
                    message: 'Email is required',
                    data: null
                });
            }
            const existingUser = await db.user.findUnique({ where: { email: email } });
            const verifiedUser = await db.verified.findUnique({ where: { email: email } });

            if (existingUser) {
                return BaseResponse.returnResponse({
                    statusCode: 400,
                    message: 'you dont have anyt pirmetion',
                    data: null
                });
            } else {
                if (!verifiedUser) {
                    await db.verified.create({
                        data: { email: email, otp: otp }
                    });
                } else {
                    await db.verified.update({
                        where: { id: verifiedUser.id },
                        data: { otp }
                    });
                }
                services.sendEmailWithLogo(email, otp, EmailTypes.CHANGE_PASSWORD);
                return BaseResponse.returnResponse({
                    statusCode: 200,
                    message: 'registration code sent to email',
                    data: null
                });
            }
        }
        if (emailTypes === EmailTypes.FORGET_PASSWORD) {
            if (!email) {
                return BaseResponse.returnResponse({
                    statusCode: 400,
                    message: 'Email is required',
                    data: null
                });
            }
            const existingUser = await db.user.findUnique({ where: { email: email } });
            const verifiedUser = await db.verified.findUnique({ where: { email: email } });

            if (!existingUser) {
                return BaseResponse.returnResponse({
                    statusCode: 400,
                    message: 'your email is not found please register',
                    data: null
                });
            } else {
                if (!verifiedUser) {
                    await db.verified.create({
                        data: { email: email, otp: otp }
                    });
                } else {
                    await db.verified.update({
                        where: { id: verifiedUser.id },
                        data: { otp }
                    });
                }
            }
            services.sendEmailWithLogo(email, otp, EmailTypes.FORGET_PASSWORD);

            return BaseResponse.returnResponse({
                statusCode: 200,
                message: 'forget Password code sent to email',
                data: null
            });
        }
    }
    //TODO***************************

    async registerOtp(req: Request, res: NextResponse) {
        const schema = z
            .object({
                email: z.string().email()
            })
            .strict();
        const body = await req.json();
        const { email }: { email: string } = schema.parse(body);
        if (!email) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Email is required',
                data: null
            });
        }
        const existingUser = await db.user.findUnique({ where: { email: email } });
        const verifiedUser = await db.verified.findUnique({ where: { email: email } });

        if (existingUser) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Email is already associated with an account',
                data: null
            });
        } else {
            var otp = Math.floor(100000 + Math.random() * 900000);
            if (!verifiedUser) {
                await db.verified.create({
                    data: { email: email, otp: otp }
                });
            } else {
                await db.verified.update({
                    where: { id: verifiedUser.id },
                    data: { otp }
                });
            }
            services.sendEmailWithLogo(email, otp, EmailTypes.REGISTER);
            return BaseResponse.returnResponse({
                statusCode: 200,
                message: 'registration code sent to email',
                data: null
            });
        }
    }

    async forgetPasswordOtp(req: Request, res: NextResponse) {
        const body = await req.json();
        VerifiedValidator.emailValidator(body);
        const { email }: { email: string } = body;
        if (!email) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Email is required',
                data: null
            });
        }
        const existingUser = await db.user.findUnique({ where: { email: email } });
        const verifiedUser = await db.verified.findUnique({ where: { email: email } });

        if (!existingUser) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'email is not found please complete register email',
                data: null
            });
        }
        if (!verifiedUser) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Email is not found , you are dosent register in this email',
                data: null
            });
        }
        var otp = Math.floor(100000 + Math.random() * 900000);

        if (verifiedUser && existingUser) {
            await db.verified.update({
                where: { id: verifiedUser.id },
                data: { otp }
            });
        }
        services.sendEmailWithLogo(email, otp, EmailTypes.FORGET_PASSWORD);
        return BaseResponse.returnResponse({
            statusCode: 200,
            message: 'foget password code sent to email',
            data: null
        });
    }
}
export default VeryfiedRepository;
