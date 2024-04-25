import { findUsers } from '../../service/action';

export async function POST(req: Request) {
    return findUsers(req);
}
