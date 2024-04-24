'use server';

import BaseServices from '@/app/api/core/base-services/base-services';
import { EmailTypes } from '@/app/api/core/constant/enum';
import GlobalUtils from '@/app/utils/global-utils';
import UsersRepository from '../../users/repository';
import VeryfiedRepository from '../repository/verified-repository';
import VerifiedValidator from '../validator/validation';
const services = new BaseServices();

export const registerOtp = async (payload: { email: string }) => {
    VerifiedValidator.emailValidator(payload);
    const { email } = payload;
    const existingUser = await UsersRepository.find({ email });

    if (existingUser) {
        throw 'Email is already associated with an account';
    }

    const verifiedUser = await VeryfiedRepository.find({ email });
    var otp = Math.floor(100000 + Math.random() * 900000);

    // flag to delete otp if necessary
    var shallRollback = false;
    var verifiedUserObj;
    try {
        if (!verifiedUser) {
            verifiedUserObj = await VeryfiedRepository.create({
                email,
                otp
            });
            shallRollback = true;
        } else {
            verifiedUserObj = await VeryfiedRepository.update(verifiedUser.id, { email, otp });
        }
    } catch (err) {
        throw 'Error creating OTP';
    }
    try {
        services.sendEmailWithLogo(email, otp, EmailTypes.REGISTER);
    } catch (err) {
        // Rollback created otp if couldn't send mail
        if (shallRollback && !GlobalUtils.isNullOrUndefined(verifiedUserObj)) {
            VeryfiedRepository.delete(verifiedUserObj.id);
        }
        throw 'Error sending OTP mail';
    }
    return 'registration code sent to email';
};
