import BaseResponse from '@/app/api/core/base-response/base-response';
import { db } from '@/app/api/core/db/db';
import { ROLE } from '@prisma/client';
import UserVailedator from '../validator/validation';
interface AdminRegisterInput {
    email: string;
    name: string;
    password: string;
}
class AuthRepository {
    static async adminRegister(req: Request) {
        const body = await req.json();
        UserVailedator.registerValidator(body);
        const { email, name, password }: AdminRegisterInput = body;

        const existUserByEmail = await db.user.findUnique({ where: { email: email } });
        if (existUserByEmail) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'user is exist for this email please register from another email',
                data: null
            });
        }
        const newUser = await db.user.create({
            data: {
                username: name,
                password: password,
                role: ROLE.ADMIN,
                email: email
            }
        });

        return {
            id: newUser.id,
            name,
            email,
            role: newUser.role
        };
    }

    static async forgetPassword(req: Request) {
        const body = await req.json();
        UserVailedator.forgetPasswordValidator(body);
        const {
            otp: otpString,
            email,
            password
        }: { otp: string; email: string; password: string } = body;
        const otp = parseInt(otpString, 10);
        const existingUser = await db.user.findUnique({ where: { email: email } });
        const verifiedUser = await db.verified.findUnique({ where: { email: email } });

        if (!existingUser || !verifiedUser) {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Email is not found',
                data: null
            });
        }

        if (verifiedUser.otp === otp) {
            await db.user.update({
                where: { email: verifiedUser.email },
                data: { password }
            });
            return BaseResponse.returnResponse({
                statusCode: 200,
                message: 'Password updated successfully',
                data: null
            });
        } else {
            return BaseResponse.returnResponse({
                statusCode: 400,
                message: 'Invalid code please rewrite againe',
                data: null
            });
        }
    }
}
export default AuthRepository;
