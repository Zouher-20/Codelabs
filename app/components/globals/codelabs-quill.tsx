import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function CodeLabsQuill({
    onChange,
    value
}: {
    onChange: (value: string) => void;
    value: string;
}) {
    const QuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean']
        ]
    };
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
            className="mt-4"
        />
    );
}
