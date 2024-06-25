import { NextResponse } from 'next/server';
import { createUserProjectLabFromTemplate } from '../../services/action';
import { UserProjectInput } from '../../types';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, tagId, templateId }: UserProjectInput = body;
        const response = await createUserProjectLabFromTemplate(body);
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
