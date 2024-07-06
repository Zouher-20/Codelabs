import { NextResponse } from 'next/server';
import { cloneLabForRoomInClass } from '../../../class-room/services/action';
import { CloneLabForRoomInClassInput } from '../../../class-room/types';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, type, labId, classRomId, endAt }: CloneLabForRoomInClassInput =
            body;
        const response = await cloneLabForRoomInClass(body);
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
