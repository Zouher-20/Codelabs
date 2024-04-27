'use server';
import AuthUtils from '@/app/utils/auth-utils';
import { ROLE } from '@prisma/client';
import { cookies } from 'next/headers';
import UsersRepository from '../../users/repository';
import VeryfiedRepository from '../../verified/repository/verified-repository';
import { AdminRegisterInput, RegisterUserInput } from '../types';
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

    const existUserByEmail = await UsersRepository.find(email);
    if (existUserByEmail) {
        throw new Error('User already registerd');
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

export const adminRegister = async (payload: AdminRegisterInput) => {
    AuthValidator.adminRegisterValidator(payload);
    const { email, name, password }: AdminRegisterInput = payload;

    const existUserByEmail = await UsersRepository.find({ email });
    if (existUserByEmail) {
        throw 'user is exist for this email please register from another email';
    }
    const newUser = await UsersRepository.create({
        username: name,
        password: password,
        role: ROLE.ADMIN,
        email: email
    });

    return {
        id: newUser.id,
        name,
        email,
        role: newUser.role
    };
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
