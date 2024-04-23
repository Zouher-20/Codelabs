'use client';
import empty from '@/public/images/classes/empty-class.svg';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const MainAdminPage = () => {
    const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });
    var content = '';

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

    const handleEditorChange = ({ newContent }: { newContent: string }) => {
        content = newContent;
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-2">
            <img src={empty.src} className="w-1/3" />
            <div className="flex flex-col items-center">
                <p className="text-md">Welecome to the Admin Dashboard</p>
                <p className="text-sm text-gray-500">This page will be implemented later</p>
                <QuillEditor
                    value={content}
                    onChange={(value: string) => {
                        handleEditorChange({ newContent: value });
                    }}
                    modules={quillModules}
                    formats={quillFormats}
                    className="w-1/2  bg-white"
                />
            </div>
        </div>
    );
};

export default MainAdminPage;
