import { z } from 'zod';

class BaseValidation {
    static validate(reqBody: any, validation: any) {
        // Check if request body exists
        if (!reqBody || Object.keys(reqBody).length === 0) {
            return { formErrors: ['Required'], fieldErrors: {} };
        }

        const schema = z.object(validation);
        const validationResult = schema.safeParse(reqBody);

        if (validationResult.success === false) {
            const validationErrors = validationResult.error.flatten();
            return validationErrors;
        }
    }
}

export default BaseValidation;
