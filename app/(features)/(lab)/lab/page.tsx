'use client';
import Editor from '@monaco-editor/react';
import 'xterm/css/xterm.css';
import EditorToolbar from '../components/editor-toolbar';
import FileTree from '../components/file-tree';
import { TreeContextProvider, useTree } from '../components/tree-context';
import { useContainer } from '../hooks/use-container';
import './styles.css';
// import { files } from './files';

// TODO: add folder add file delete , solve the dot error , make them component , get lab from server , reboot and save methods
const files = {
    myproject: {
        directory: {
            'foo.js': {
                file: {
                    contents: 'const x = 1;'
                }
            },
            envrc: {
                file: {
                    contents: 'ENVIRONMENT=staging'
                }
            },
            test: {
                directory: {
                    'foo.js': {
                        file: {
                            contents: 'const x = 1;'
                        }
                    },
                    '.envrc': {
                        file: {
                            contents: 'ENVIRONMENT=staging'
                        }
                    }
                }
            }
        }
    },
    emptyFolder: {
        directory: {}
    }
};
export default function Lab() {
    const { editor, setEditor } = useContainer(files);
    const handleEditorChange = (value?: string) => {
        if (value) {
            setEditor(value);
        }
    };

    const tree = useTree();

    return (
        <TreeContextProvider nodes={files} setFile={setEditor}>
            <div className="flex">
                <div className="w-1/6">
                    <FileTree tree={files} />
                </div>
                <div className="grid min-h-screen w-5/6 grid-cols-2">
                    <EditorToolbar />
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
        </TreeContextProvider>
    );
}
