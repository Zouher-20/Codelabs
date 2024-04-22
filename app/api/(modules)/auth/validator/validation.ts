import { zemail, zpass, ztext } from '@/app/schemas';
import BaseValidation from '../../../core/base-validation/base-validation';

class UserValidator {
    static registerValidator(reqBody: any) {
        const error = BaseValidation.validate(reqBody, {
            email: zemail,
            otp: ztext(6, 6),
            name: ztext(5, 35),
            password: zpass
        });
        if (error) {
            throw error;
        }
    }

    static forgetPasswordValidator(reqBody: any) {
        const error = BaseValidation.validate(reqBody, {
            email: zemail,
            otp: ztext(6, 6),
            password: zpass
        });
        if (error) {
            throw error;
        }
    }
}

export default UserValidator;
