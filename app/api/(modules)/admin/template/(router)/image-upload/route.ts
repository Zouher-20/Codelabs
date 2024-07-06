import { NextResponse } from 'next/server';
import { uploadImage } from '../../services/action';

export async function POST(req: Request) {
    try {
        const data = await req.formData();
        const file: File | null = data.get('file') as unknown as File;
        const response = await uploadImage({ file });
        return NextResponse.json({
            data: response
        });
    } catch (err) {
        console.log('Error:', err);
        return NextResponse.json({
            data: 'error while uploading'
        });
    }
}
