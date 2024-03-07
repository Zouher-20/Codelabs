import { NextRequest, NextResponse } from 'next/server';
import baseResponse from '../../../../core/base-response/base-response';

export async function POST(req: NextRequest, res: NextResponse) {
    return baseResponse.returnResponse({
        statusCode: 200,
        message: 'Success',
        data: 'hellooooooo'
    });
}
