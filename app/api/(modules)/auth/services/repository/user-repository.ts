import BaseResponse from '@/app/api/core/base-response/base-response';
import { db } from '@/app/api/core/db/db';
import { ROLE } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import UserVailedator from '../../../veryfied/services/validator/validation';
class UserRepository {
    async register(req: Request, res: NextResponse) {
        const body = await req.json();
        UserVailedator.registerValidator(body);
        const {
            otp: otpString,
            email,
            name,
            password
        }: { otp: string; email: string; name: string; password: string } = body;
        const otp = parseInt(otpString, 10);

        const existUserByEmail = await db.user.findUnique({ where: { email: email } });
        if (existUserByEmail) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'user is exist for this email please register from another email',
                data: null
            });
        }
        const existUserByName = await db.user.findUnique({ where: { username: name } });
        if (existUserByName) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'user is exist for this username please select another username',
                data: null
            });
        }

        const existuserVerified = await db.verified.findUnique({ where: { email } });

        if (existuserVerified && existuserVerified.otp === otp) {
            const newUser = await db.user.create({
                data: {
                    username: name,
                    password: await bcrypt.hash(password, 15),
                    role: ROLE.USER,
                    email: email
                }
            });

            return BaseResponse.returnResponse({
                statusCode: 200,
                message: 'reigster successful',
                data: {
                    user: { id: newUser.id, name, email, role: newUser.role }
                }
            });
        } else {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Invalid OTP !! or you are not verified your email',
                data: null
            });
        }
    }
    async adminRegister(req: Request, res: NextResponse) {
        const body = await req.json();
        UserVailedator.registerValidator(body);
        const {
            otp: otpString,
            email,
            name,
            password
        }: { otp: string; email: string; name: string; password: string } = body;
        const otp = parseInt(otpString, 10);

        const existUserByEmail = await db.user.findUnique({ where: { email: email } });
        if (existUserByEmail) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'user is exist for this email please register from another email',
                data: null
            });
        }
        const existUserByName = await db.user.findUnique({ where: { username: name } });
        if (existUserByName) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'user is exist for this username please select another username',
                data: null
            });
        }

        const existuserVerified = await db.verified.findUnique({ where: { email } });

        if (existuserVerified && existuserVerified.otp === otp) {
            const newUser = await db.user.create({
                data: {
                    username: name,
                    password: await bcrypt.hash(password, 15),
                    role: ROLE.ADMIN,
                    email: email
                }
            });

            return BaseResponse.returnResponse({
                statusCode: 200,
                message: 'reigster successful',
                data: {
                    user: { id: newUser.id, name, email, role: newUser.role }
                }
            });
        } else {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Invalid OTP !! or you are not verified your email',
                data: null
            });
        }
    }
}
export default UserRepository;
