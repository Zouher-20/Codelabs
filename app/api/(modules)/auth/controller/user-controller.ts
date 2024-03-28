import { NextResponse } from 'next/server';
import baseResponse from '../../../core/base-response/base-response';
import UserRepository from '../services/repository/user-repository';

const repository = new UserRepository();

class UserController {
    register = async (req: Request, res: NextResponse) => {
        try {
            return repository.register(req, res);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 500,
                message: String(err),
                data: null
            });
        }
    };

    adminRegister = async (req: Request, res: NextResponse) => {
        try {
            return repository.adminRegister(req, res);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 500,
                message: String(err),
                data: null
            });
        }
    };

    forgetPassword = async (req: Request, res: NextResponse) => {
        try {
            return repository.forgetPassword(req, res);
        } catch (err) {
            return baseResponse.returnResponse({
                statusCode: 500,
                message: String(err),
                data: null
            });
        }
    };
}

export default UserController;
