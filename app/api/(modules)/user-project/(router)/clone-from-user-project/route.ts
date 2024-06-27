import { NextResponse } from 'next/server';
import { cloneLabFromUserProject, createUserProjectLabFromTemplate } from '../../services/action';
import { CloneCodeFromUserProjectInput, UserProjectInput } from '../../types';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, tagId, labId }: CloneCodeFromUserProjectInput = body;
        const response = await cloneLabFromUserProject(body);
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
