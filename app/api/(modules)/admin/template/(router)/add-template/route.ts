import { NextResponse } from 'next/server';
import { addTemplate, uploadImage } from '../../services/action';
import { addTemplateInput } from '../../../types';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nameTemplate, imageTemplate }: addTemplateInput = body;
        const response = await addTemplate(body);
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
