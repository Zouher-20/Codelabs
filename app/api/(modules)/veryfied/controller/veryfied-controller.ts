import { NextResponse } from 'next/server';
import baseResponse from '../../../core/base-response/base-response';
import VeryfiedRepository from '../services/repository/veryfied-repository';
const repository = new VeryfiedRepository();

class VeryfiedController {
    registerOtp = async (req: Request, res: NextResponse) => {
        try {
            return repository.registerOtp(req, res);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 400,
                message: String(err),
                data: null
            });
        }
    };
}

export default VeryfiedController;
