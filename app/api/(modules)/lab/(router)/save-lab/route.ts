import { NextResponse } from 'next/server';
import { SaveCodeLabInput } from '../../type';
import { saveCodeLab } from '../../services/action';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { labId, jsoncontan }: SaveCodeLabInput = body;
        const response = await saveCodeLab(body);
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
