import { adminRegister } from '../../service/actions';

export async function POST(req: Request) {
    return adminRegister(req);
}
