import { NextResponse } from 'next/server';
import { addTemplate, uploadImage } from '../../services/action';
import { addTemplateInput } from '../../../types';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nameTemplate, imageTemplate }: addTemplateInput = body;
        const response = await addTemplate(body);
        return NextResponse.json({
            data: response
        });

    } catch (err) {
        console.log('Error:', err);
        return NextResponse.json({
            data: "error while adding template"
        });
    }
}
