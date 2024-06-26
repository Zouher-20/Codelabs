'use client';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { Editor } from '@monaco-editor/react';
import { FileSystemTree } from '@webcontainer/api';
import { debounce, get } from 'lodash';
import { useEffect, useState } from 'react';
import 'xterm/css/xterm.css';
import { useContainer } from '../hooks/use-container';
import TreeHelper from '../lab/tree-helper';
import EditorToolbar from './editor-toolbar';
import { TreeReducerActionType, useTree, useTreeDispatch } from './tree-context';

export default function CodeEditor({ files }: { files: FileSystemTree }) {
    const { editor, setEditor, booting, writeFile, setupContainer, webcontainerInstance } =
        useContainer();
    const [language, setLanguage] = useState('json');
    const [dirty, setDirty] = useState(false);
    const dispatch = useTreeDispatch();

    const tree = useTree();
    const handleEditorChange = debounce((value?: string) => {
        if (value) {
            setEditor(value);
            if (dispatch) dispatch({ type: TreeReducerActionType.FILE_UPDATE, payload: value });
            writeFile(tree.activeFile, value);
            setDirty(true);
        }
    }, 500);

    useEffect(() => {
        if (tree.activeFileName?.includes('.json')) setLanguage('json');
        else if (tree.activeFileName?.includes('.js')) setLanguage('javascript');
        else if (tree.activeFileName?.includes('.ts')) setLanguage('typescript');
        else setLanguage('text');

        setEditor(get(tree.nodes, TreeHelper.getParsedPath(tree.activeFile)));
        setDirty(false);
    }, [tree.activeFile]);

    useEffect(() => {
        setupContainer(files);
        if (webcontainerInstance.current && dispatch && !tree.webContainerInstance)
            dispatch({
                type: TreeReducerActionType.SET_CONTAINER,
                payload: webcontainerInstance.current
            });
    }, [webcontainerInstance.current]);

    return (
        <div className="grid min-h-screen w-5/6 grid-cols-2">
            <EditorToolbar dirty={dirty} />
            <div className="editor min-h-[600px] w-full">
                <Editor
                    className="h-full w-full rounded-lg"
                    language={language}
                    value={editor}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    key={tree.activeFile.join()}
                />
            </div>
            <div className="h-full w-full bg-base-100">
                {booting ? (
                    <div className="flex h-full flex-col items-center justify-center">
                        <DotLottiePlayer
                            className=" h-32"
                            src="/lottieFiles/lab-animation.lottie"
                            autoplay
                            loop
                        ></DotLottiePlayer>
                        <div className="mt-4">Booting up your container ...</div>
                    </div>
                ) : (
                    <iframe id="lab-preview-iframe" className="h-full w-full bg-slate-50"></iframe>
                )}
            </div>
            <div id="terminal" className=" col-span-2 h-fit"></div>
        </div>
    );
}
