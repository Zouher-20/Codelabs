import baseResponse from '@/app/api/core/base-response/base-response';
import { addTag } from '../../service/action';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const tag = body.tag;
        const newTag = await addTag(body);
        return baseResponse.returnResponse({
            statusCode: 200,
            message: 'Successfully added tag',
            data: newTag
        });
    } catch (err) {
        console.error('An error occurred:', err);
        return baseResponse.returnResponse({
            statusCode: 500,
            message: 'Error occurred while adding tag',
            data: null
        });
    }
}
