import { zPage } from '@/app/schemas';
import { z } from 'zod';
import BaseValidation from '../../../core/base-validation/base-validation';
import paginationInput from '../service/action';
import { zpageSize } from './../../../../schemas/index';

class AdminValidator {
    static userPaginationValidator(reqBody: paginationInput) {
        const error = BaseValidation.validate(reqBody, {
            page: zPage,
            pageSize: zpageSize,
            searchWord: z.string().min(1),
            data: z.date()
        });
        throw error;
    }

    static paginationValidator(reqBody: any) {
        const error = BaseValidation.validate(reqBody, {
            page: zPage,
            pageSize: zpageSize,
            keyword: z.string().min(1),
            data: z.date()
        });
        throw error;
    }
}

export default AdminValidator;
