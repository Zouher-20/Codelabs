import { zemail, zpass, ztext } from '@/app/schemas';
import BaseValidation from '../../../core/base-validation/base-validation';

class AuthValidator {
    static registerValidator(payload: {
        email: string;
        otp: string;
        name: string;
        password: string;
    }) {
        const error = BaseValidation.validate(payload, {
            email: zemail,
            otp: ztext(6, 6),
            name: ztext(5, 35),
            password: zpass
        });
        if (error) {
            throw error;
        }
    }
    static adminRegisterValidator(payload: { email: string; name: string; password: string }) {
        const error = BaseValidation.validate(payload, {
            email: zemail,
            name: ztext(5, 35),
            password: zpass
        });
        if (error) {
            throw error;
        }
    }

    static signInValidator(payload: { email: string; password: string }) {
        const error = BaseValidation.validate(payload, {
            email: zemail,
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

export default AuthValidator;
