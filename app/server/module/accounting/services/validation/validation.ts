import { z } from 'zod';
import BaseValidation from '../../../../core/base-validation/base-validation';

class AccountVailedation {
    static validateLogin(req: any) {
        const error = BaseValidation.validate(req, {
            email: z.string().email()
        });
        if (error) {
            throw error;
        }
    }
}

export default AccountVailedation;
