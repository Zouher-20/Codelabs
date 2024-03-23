import BaseResponse from '@/app/api/core/base-response/base-response';
import BaseServices from '@/app/api/core/base-services/base-services';
import { EmailTypes } from '@/app/api/core/constant/enum';
import { db } from '@/app/api/core/db/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
const services = new BaseServices();

class VeryfiedRepository {
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
}
export default VeryfiedRepository;
