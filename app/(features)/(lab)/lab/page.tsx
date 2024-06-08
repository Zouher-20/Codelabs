'use client';
import CodeEditor from '../components/code-editor';
import FileTree from '../components/file-tree';
import { TreeContextProvider, useTree } from '../components/tree-context';
import { files } from './nodejs-examble';
import './styles.css';

// TODO: add folder add file delete , get lab from server , reboot and save methods

export default function Lab() {
    const treeState = useTree();

    return (
        <TreeContextProvider nodes={files}>
            <div className="flex">
                <div className="w-1/6 border-e border-base-100 bg-base-300">
                    <FileTree
                        tree={{
                            root: {
                                directory: files
                            }
                        }}
                    />
                </div>
                <CodeEditor files={files} />
            </div>
        </TreeContextProvider>
    );
}
