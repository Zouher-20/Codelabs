import { NextResponse } from 'next/server';
import UserController from '../../controller/user-controller';

export async function POST(req: Request, res: NextResponse) {
    const { email, password } = await req.json();

    return UserController.signIn(email, password);
}
