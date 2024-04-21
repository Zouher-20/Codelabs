import BaseResponse from '@/app/api/core/base-response/base-response';
import { db } from '@/app/api/core/db/db';
import { ROLE } from '@prisma/client';
import { RegisterUserInput } from '../service/actions';
import UserVailedator from '../validator/validation';

class UserRepository {
    static async register(req: RegisterUserInput) {
        UserVailedator.registerValidator(req);
        const {
            otp: otpString,
            email,
            name,
            password
        }: { otp: string; email: string; name: string; password: string } = req;
        const otp = parseInt(otpString, 10);

        const existUserByEmail = await db.user.findUnique({ where: { email: email } });
        if (existUserByEmail) {
            throw new Error('User already registerd');
        }

        const existuserVerified = await db.verified.findUnique({ where: { email } });

        if (existuserVerified && existuserVerified.otp === otp) {
            const newUser = await db.user.create({
                data: {
                    username: name,
                    password: password,
                    role: ROLE.USER,
                    email: email
                }
            });

            return {
                user: { id: newUser.id, name, email, role: newUser.role }
            };
        } else {
            throw new Error('Invalid OTP');
        }
    }
    static async adminRegister(req: Request) {
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
                    password: password,
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
    static async authinticate(email: string, password: string) {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });

        if (user) {
            const providedPassword: string = password || '';
            const isMatch = providedPassword === password;

            if (!isMatch) return { userData: null, valid: false };
            return { userData: user, valid: true };
        } else {
            return { userData: null, valid: false };
        }
    }
}
export default UserRepository;
