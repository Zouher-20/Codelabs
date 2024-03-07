import { NextResponse } from 'next/server';

class BaseResponse {
    static returnResponse({
        statusCode,
        message,
        data
    }: {
        statusCode: number;
        message: string;
        data?: any;
    }): NextResponse {
        return NextResponse.json({
            status: statusCode,
            message: message,
            data: data
        });
    }
}

export default BaseResponse;
