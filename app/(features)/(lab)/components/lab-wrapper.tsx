'use client';
import { FileSystemTree } from '@webcontainer/api';
import CodeEditor from '../components/code-editor';
import FileTreeWrapper from '../components/file-tree-wrapper';
import { TreeContextProvider } from '../components/tree-context';
import '../lab/styles.css';
// get lab from server , reboot and save methods

export default function LabWrapper({ files, labId }: { files: FileSystemTree; labId: string }) {
    return (
        <TreeContextProvider nodes={files} labId={labId}>
            <div className="flex">
                <div className="w-1/6 border-e border-base-100 bg-base-300">
                    <FileTreeWrapper />
                </div>
                <CodeEditor files={files} />
            </div>
        </TreeContextProvider>
    );
}
