'use server';
import AuthUtils from '@/app/utils/auth-utils';
import { cookies } from 'next/headers';
import baseResponse from '../../../core/base-response/base-response';
import UserRepository from '../repository/user-repository';
export interface RegisterUserInput {
    otp: string;
    email: string;
    name: string;
    password: string;
}
export const register = async (value: RegisterUserInput) => {
    try {
        return UserRepository.register(value);
    } catch (err) {}
};

export const adminRegister = async (req: Request) => {
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

export const forgetPassword = async (req: Request) => {
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

export const signIn = async (email: string, password: string) => {
    try {
        const { valid, userData } = await UserRepository.authinticate(email, password);
        if (!valid) throw 'Invalid Credentials';
        const encryptedSessionData = await AuthUtils.encryptJwt(userData);
        cookies().set('session', encryptedSessionData as unknown as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/'
        });
    } catch (err) {}
};

export const signOut = async () => {
    cookies().set('session', '', { expires: new Date(0) });
};

export const getSession = () => {
    const sessionAsToken = cookies().get('session')?.value;
    if (!sessionAsToken) return null;
    return AuthUtils.decryptJwt(sessionAsToken);
};
