import { z } from 'zod';
import BaseValidation from '../../../../core/base-validation/base-validation';

class VeryfiedValidator {
    static emailValidator(reqBody: any) {
        const error = BaseValidation.validate(reqBody, {
            email: z.string().email()
        });
        if (error) {
            throw error;
        }
    }
}

export default VeryfiedValidator;
