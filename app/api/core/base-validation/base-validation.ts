import { z } from 'zod';

class BaseValidation {
    static validate(req: any, validation: any) {
        const schema = z.object(validation);
        const validationResult = schema.safeParse(req.body);

        if (validationResult.success === false) {
            const validationErrors = validationResult.error.flatten();
            return validationErrors;
        }
    }
}

export default BaseValidation;
