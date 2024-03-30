'use client';
import Editor from '@monaco-editor/react';
import 'xterm/css/xterm.css';
import { useContainer } from '../hooks/use-container';
import { files } from './files';

export default function Lab() {
    const { editor, setEditor } = useContainer(files);
    const handleEditorChange = (value?: string) => {
        if (value) {
            setEditor(value);
        }
    };
    return (
        <div>
            <div className="grid min-h-screen grid-cols-2">
                <div className="editor w-full">
                    <Editor
                        className="h-full w-full rounded-lg"
                        defaultLanguage="javascript"
                        value={editor}
                        onChange={handleEditorChange}
                        theme="vs-dark"
                    />
                </div>
                <div className="h-full w-full rounded-lg">
                    <iframe
                        id="lab-preview-iframe"
                        className="h-full w-full bg-slate-50"
                        src="loading.html"
                    ></iframe>
                </div>
                <div id="terminal" className=" col-span-2 h-fit"></div>
            </div>
        </div>
    );
}
