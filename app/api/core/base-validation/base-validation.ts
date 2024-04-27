import { z } from 'zod';

class BaseValidation {
    static validate(value: any, validation: any) {
        // Check if request body exists
        if (!value || Object.keys(value).length === 0) {
            return { formErrors: ['Required'], fieldErrors: {} };
        }

        const schema = z.object(validation);
        const validationResult = schema.safeParse(value);

        if (validationResult.success === false) {
            const validationErrors = validationResult.error.flatten();
            return validationErrors;
        }
    }
}

export default BaseValidation;
