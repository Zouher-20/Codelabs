import { db } from '@/app/api/core/db/db';
import bcrypt from 'bcrypt';

class AuthRepository {
    // static async forgetPassword(req: Request) {
    //     const body = await req.json();
    //     UserVailedator.forgetPasswordValidator(body);
    //     const {
    //         otp: otpString,
    //         email,
    //         password
    //     }: { otp: string; email: string; password: string } = body;
    //     const otp = parseInt(otpString, 10);
    //     const existingUser = await db.user.findUnique({ where: { email: email } });
    //     const verifiedUser = await db.verified.findUnique({ where: { email: email } });
    //     if (!existingUser || !verifiedUser) {
    //         return BaseResponse.returnResponse({
    //             statusCode: 400,
    //             message: 'Email is not found',
    //             data: null
    //         });
    //     }
    //     if (verifiedUser.otp === otp) {
    //         await db.user.update({
    //             where: { email: verifiedUser.email },
    //             data: { password }
    //         });
    //         return BaseResponse.returnResponse({
    //             statusCode: 200,
    //             message: 'Password updated successfully',
    //             data: null
    //         });
    //     } else {
    //         return BaseResponse.returnResponse({
    //             statusCode: 400,
    //             message: 'Invalid code please rewrite againe',
    //             data: null
    //         });
    //     }
    // }
    static async deleteMyAccount(payload: { password: string }, userId: string) {
        const requestingUser = await db.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!requestingUser) {
            throw new Error('User not found');
        }
        const passwordMatch = await bcrypt.compare(payload.password, requestingUser.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        } else {
            await db.user.deleteMany({
                where: {
                    id: userId
                }
            });
        }
    }
}
export default AuthRepository;
