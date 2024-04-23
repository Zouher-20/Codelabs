import { z } from 'zod';
import BaseValidation from '../../../../core/base-validation/base-validation';
import { OtpInput } from '../../controller/verified-controller';

class VerifiedValidator {
    static emailValidator(reqBody: OtpInput) {
        const error = BaseValidation.validate(reqBody, {
            email: z.string().email()
        });
        if (error) {
            throw error;
        }
    }
}

export default VerifiedValidator;
