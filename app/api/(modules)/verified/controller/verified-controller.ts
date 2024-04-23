import { EmailTypes } from '@/app/api/core/constant/enum';
import { NextResponse } from 'next/server';
import { default as baseResponse } from '../../../core/base-response/base-response';
import { getSession } from '../../auth/service/actions';
import VerifiedRepository from '../services/repository/verified-repository';
import VerifiedValidator from '../services/validator/validation';
const repository = new VerifiedRepository();
export interface OtpInput {
    email?: string;
}

class VeryfiedController {
    registerOtp = async (req: Request, res: NextResponse) => {
        try {
            return repository.registerOtp(req, res);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 400,
                message: String(err),
                data: null
            });
        }
    };

    forgetPasswordOtp = async (value: OtpInput) => {
        try {
            await VerifiedValidator.emailValidator(value);
            return repository.sendOtp(EmailTypes.CHANGE_PASSWORD, value);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 400,
                message: String(err),
                data: null
            });
        }
    };

    changePasswordOTP = async () => {
        try {
            const session = await getSession();
            const email = session?.email;
            return repository.sendOtp(EmailTypes.CHANGE_PASSWORD, email);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 400,
                message: String(err),
                data: null
            });
        }
    };
}

export default VeryfiedController;
