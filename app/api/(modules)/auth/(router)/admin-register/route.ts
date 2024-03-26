import { NextResponse } from 'next/server';
import UserController from '../../controller/user-controller';

const controller = new UserController();

export async function POST(req: Request, res: NextResponse) {
    return controller.adminRegister(req, res);
}
