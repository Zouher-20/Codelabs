import { NextRequest, NextResponse } from 'next/server';
import baseResponse from '../../../core/base-response/base-response';
import accountingRepository from '../services/repository/accounting-repository';

const repository = new accountingRepository();

class ExampleController {
    register = async (req: NextRequest, res: NextResponse) => {
        try {
            return baseResponse.returnResponse({
                statusCode: 200,
                message: 'Success',
                data: 'hellooooooo'
            });
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 400,
                message: String(err),
                data: null
            });
        }
    };
}

export default ExampleController;
