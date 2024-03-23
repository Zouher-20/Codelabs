import { NextResponse } from 'next/server';
import VeryfiedController from '../../controller/veryfied-controller';

const controller = new VeryfiedController();
export async function POST(req: Request, res: NextResponse) {
    return controller.registerOtp(req, res);
}
