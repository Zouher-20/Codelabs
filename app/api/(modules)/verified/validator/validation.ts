import { zemail } from '@/app/schemas';
import BaseValidation from '../../../core/base-validation/base-validation';
import { OtpInput } from '../controller/verified-controller';

class VerifiedValidator {
    static emailValidator(payload: OtpInput) {
        const error = BaseValidation.validate(payload, {
            email: zemail
        });
        if (error) {
            throw error;
        }
    }
}

export default VerifiedValidator;
