import { z } from 'zod';
import BaseValidation from '../../../../core/base-validation/base-validation';

class VerifiedValidator {
    static emailValidator(payload: { email: string }) {
        const error = BaseValidation.validate(payload, {
            email: z.string().email()
        });
        if (error) {
            throw error;
        }
    }
}

export default VerifiedValidator;
