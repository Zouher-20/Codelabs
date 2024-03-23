import { z } from 'zod';
import BaseValidation from '../../../../core/base-validation/base-validation';

class UserValidator {
    static registerValidator(reqBody: any) {
        const error = BaseValidation.validate(reqBody, {
            email: z.string().email(),
            otp: z.string(),
            name: z.string().min(3),
            password: z.string().min(8)
        });
        if (error) {
            throw error;
        }
    }
}

export default UserValidator;
