'use server';
import BaseResponse from '@/app/api/core/base-response/base-response';
import AuthUtils from '@/app/utils/auth-utils';
import { ROLE } from '@prisma/client';
import { cookies } from 'next/headers';
import UsersRepository from '../../users/repository';
import VeryfiedRepository from '../../verified/repository/verified-repository';
import AuthRepository from '../repository/auth-repository';
import {
    AdminRegisterInput,
    AllUserInformationInput,
    DeleteMyAccountInput,
    RegisterUserInput
} from '../types';
import AuthValidator from '../validator/validation';

export const register = async (payload: RegisterUserInput) => {
    AuthValidator.registerValidator(payload);
    const {
        otp: otpString,
        email,
        name,
        password
    }: { otp: string; email: string; name: string; password: string } = payload;
    const otp = parseInt(otpString, 10);

    const existUserByEmail = await UsersRepository.find({ email: email });
    if (existUserByEmail) {
        throw new Error('User already registerd');
    }
    const existUserByName = await UsersRepository.find({ username: name });
    if (existUserByName) {
        throw new Error('username already in use');
    }
    const existuserVerified = await VeryfiedRepository.find({ email });

    if (existuserVerified && existuserVerified.otp === otp) {
        const newUser = await UsersRepository.create({
            email,
            username: name,
            password,
            role: ROLE.USER
        });

        return {
            user: { id: newUser.id, name, email, role: newUser.role }
        };
    } else {
        throw new Error('Invalid OTP');
    }
};

export const adminRegister = async (req: Request) => {
    const body = await req.json();

    AuthValidator.adminRegisterValidator(body);
    const { email, name, password }: AdminRegisterInput = body;

    const existUserByEmail = await UsersRepository.find({ email });
    if (existUserByEmail) {
        return BaseResponse.returnResponse({
            statusCode: 400,
            message: 'user is exist for this email please register from another email',
            data: null
        });
    }
    const newUser = await UsersRepository.create({
        username: name,
        password: password,
        role: ROLE.ADMIN,
        email: email
    });

    return BaseResponse.returnResponse({
        statusCode: 200,
        message: 'reigster successful',
        data: {
            user: { id: newUser.id, name, email, role: newUser.role }
        }
    });
};

// TODO: uncomment this when we implement forget password
// export const forgetPassword = async (req: Request) => {
//     try {
//         return AuthRepository.forgetPassword(req);
//     } catch (err) {
//         return baseResponse.returnResponse({
//             statusCode: 500,
//             message: String(err),
//             data: null
//         });
//     }
// };

export const signIn = async (email: string, password: string) => {
    try {
        AuthValidator.signInValidator({ email, password });
        const user = await UsersRepository.find({ email });

        if (user) {
            const providedPassword: string = password || '';
            const isMatch = providedPassword === password;

            if (!isMatch) throw 'Invalid Password';
        } else {
            throw 'User not found';
        }
        const encryptedSessionData = await AuthUtils.encryptJwt(user);
        cookies().set('session', encryptedSessionData as unknown as string, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/'
        });
        return user;
    } catch (err) {
        throw err;
    }
};

export const signOut = async () => {
    cookies().set('session', '', { expires: new Date(0) });
};

export const getSession = async () => {
    const sessionAsToken = cookies().get('session')?.value;
    if (!sessionAsToken) return null;
    return await AuthUtils.decryptJwt(sessionAsToken);
};

export const deleteMyAccount = async (payload: DeleteMyAccountInput) => {
    try {
        const session = await getSession();
        const userId = session?.id;
        if (typeof userId === 'string') {
            await AuthRepository.deleteMyAccount(payload, userId);
        } else {
            throw new Error('User session not found or invalid.');
        }
    } catch (error) {
        console.error('An error accurred:', error);
        throw new Error('An error accurred while deleting account.');
    }
    cookies().set('session', '', { expires: new Date(0) });
};

export const getCurrentUser = async () => {
    const session = await getSession();
    return await UsersRepository.find({ id: session.id });
};

export const getAllUserInformation = async (payload: AllUserInformationInput) => {
    const session = await getSession();
    const userId = session?.id;
    return await AuthRepository.getAllUserInformation(payload, userId);
};
