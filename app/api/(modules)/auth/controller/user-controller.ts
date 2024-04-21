'use server';
import GlobalUtils from '@/app/utils/global-utils';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import baseResponse from '../../../core/base-response/base-response';
import UserRepository from '../services/repository/user-repository';
const key = process.env.AUTH_SECRET || '';
class UserController {
    static register = async (req: Request) => {
        try {
            return UserRepository.register(req);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 500,
                message: String(err),
                data: null
            });
        }
    };

    static adminRegister = async (req: Request) => {
        try {
            return UserRepository.adminRegister(req);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 500,
                message: String(err),
                data: null
            });
        }
    };

    static forgetPassword = async (req: Request) => {
        try {
            return UserRepository.forgetPassword(req);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 500,
                message: String(err),
                data: null
            });
        }
    };

    static signIn = async (email: string, password: string) => {
        try {
            const { valid, userData } = await UserRepository.authinticate(email, password);
            if (!valid && GlobalUtils) throw 'Invalid Credentials';
            const encryptedSessionData = jwt.sign(userData as object, key, {
                expiresIn: '7d'
            });
            cookies().set('session', encryptedSessionData, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // One week
                path: '/'
            });
            console.log('singed');
        } catch (err) {}
    };

    static signOut = async () => {
        cookies().set('session', '', { expires: new Date(0) });
    };

    static getSession = () => {
        const sessionAsToken = cookies().get('session')?.value;
        if (!sessionAsToken) return null;
        return jwt.verify(sessionAsToken, key);
    };
}

export default UserController;
