import '@/app/components/globals/quillStyle.css';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';

export default function CodeLabsQuill({
    disabled,
    onChange,
    value
}: {
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean
}) {
    const QuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

    const quillModules = useMemo(() => ({
        toolbar: disabled ? false : [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean']
        ],
    }), [disabled]);

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        'image',
        'align',
        'color',
        'code-block'
    ];
    return (
        <QuillEditor
            value={value}
            onChange={onChange}
            modules={quillModules}
            formats={quillFormats}
            readOnly={disabled}
            className={`mt-2 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
        />
    );
}
