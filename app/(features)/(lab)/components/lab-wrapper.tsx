'use client';
import CodeEditor from '../components/code-editor';
import FileTreeWrapper from '../components/file-tree-wrapper';
import { TreeContextProvider } from '../components/tree-context';
import { files } from './nodejs-examble';

// get lab from server , reboot and save methods

export default function LabWrapper() {
    return (
        <TreeContextProvider nodes={files}>
            <div className="flex">
                <div className="w-1/6 border-e border-base-100 bg-base-300">
                    <FileTreeWrapper />
                </div>
                <CodeEditor files={files} />
            </div>
        </TreeContextProvider>
    );
}
