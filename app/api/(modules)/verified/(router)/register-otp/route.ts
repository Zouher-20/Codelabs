import { NextResponse } from 'next/server';
import VerifiedController from '../../controller/verified-controller';

const controller = new VerifiedController();
export async function POST(req: Request, res: NextResponse) {
    return controller.registerOtp(req, res);
}
