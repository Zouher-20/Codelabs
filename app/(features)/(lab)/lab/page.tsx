'use client';
import Editor from '@monaco-editor/react';
import 'xterm/css/xterm.css';
import FileTree from '../components/file-tree';
import { TreeContextProvider } from '../components/tree-context';
import { useContainer } from '../hooks/use-container';
// import { files } from './files';
const files = {
    myproject: {
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

    return (
        <div className="flex">
            <div className="w-1/6">
                <TreeContextProvider>
                    <FileTree tree={files} />
                </TreeContextProvider>
            </div>
            <div className="grid min-h-screen w-5/6 grid-cols-2">
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
