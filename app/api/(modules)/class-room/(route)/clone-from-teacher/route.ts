import { NextResponse } from 'next/server';
import { cloneLabFromTeacherInRoom } from '../../services/action';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const response = await cloneLabFromTeacherInRoom(body);
        return NextResponse.json({
            statusCode: 200,
            data: response
        });
    } catch (err: any) {
        console.log('Error:', err);
        return NextResponse.json({
            statusCode: 400,
            data: err.message
        });
    }
}
