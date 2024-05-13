import { FileSystemTree } from '@webcontainer/api';
import { get, set, unset } from 'lodash';
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import TreeHelper from '../lab/tree-helper';
export interface FileTreeState {
    nodes: FileSystemTree;
    activeFile: string[];
    activeFolder: string[];
}
export const FileTreeContext = createContext<FileTreeState>({
    nodes: {},
    activeFile: [],
    activeFolder: []
});

export const FileTreeDispatchContext = createContext<Dispatch<ITreeAction> | null>(null);
var setFileCb: CallableFunction;
export function TreeContextProvider({
    children,
    nodes,
    setFile
}: PropsWithChildren<{ nodes: FileSystemTree; setFile: CallableFunction }>) {
    setFileCb = setFile;
    const [fileTreeState, dispatch] = useReducer(treeReducer, {
        nodes,
        activeFile: [],
        activeFolder: []
    } as never);

    return (
        <>
            <FileTreeContext.Provider value={fileTreeState}>
                <FileTreeDispatchContext.Provider value={dispatch}>
                    {children}
                </FileTreeDispatchContext.Provider>
            </FileTreeContext.Provider>
        </>
    );
}

export function useTree() {
    return useContext(FileTreeContext);
}

export function useTreeDispatch() {
    return useContext(FileTreeDispatchContext);
}

export enum TreeReducerActionType {
    FOLDER_CLOSE,
    FILE_ACTIVATE,
    FOLDER_ACTIVATE,
    NODE_DELETE,
    FOLDER_CREATE,
    FILE_CREATE
}

interface IFileActivateAction {
    type: TreeReducerActionType.FILE_ACTIVATE;
    payload: string[];
}

interface IFolderActivateAction {
    type: TreeReducerActionType.FOLDER_ACTIVATE;
    payload: string[];
}

interface INodeDeleteAction {
    type: TreeReducerActionType.NODE_DELETE;
    payload: string[];
}
interface IFileCreateAction {
    type: TreeReducerActionType.FILE_CREATE;
    payload: string[];
}
interface IFolderCreateAction {
    type: TreeReducerActionType.FOLDER_CREATE;
    payload: string[];
}

type ITreeAction =
    | IFileActivateAction
    | IFolderActivateAction
    | INodeDeleteAction
    | IFileCreateAction
    | IFolderCreateAction;

export function treeReducer(fileTreeSate: FileTreeState, { type, payload }: ITreeAction) {
    switch (type) {
        case TreeReducerActionType.FILE_ACTIVATE: {
            if (setFileCb)
                setFileCb(
                    get(fileTreeSate.nodes, TreeHelper.getStringPath(payload) + '.file.contents')
                );
            return {
                activeFolder: fileTreeSate.activeFolder,
                activeFile: payload,
                nodes: fileTreeSate.nodes
            };
        }
        case TreeReducerActionType.FOLDER_ACTIVATE: {
            return {
                activeFolder: payload,
                activeFile: fileTreeSate.activeFile,
                nodes: fileTreeSate.nodes
            };
        }
        case TreeReducerActionType.NODE_DELETE: {
            unset(fileTreeSate.nodes, TreeHelper.getStringPath(payload));
            return {
                activeFolder: fileTreeSate.activeFolder,
                activeFile: ['package.json'],
                nodes: fileTreeSate.nodes
            };
        }
        case TreeReducerActionType.FOLDER_CREATE: {
            set(fileTreeSate.nodes, TreeHelper.getStringPath(payload), { directory: {} });
            return {
                activeFolder: fileTreeSate.activeFolder,
                activeFile: fileTreeSate.activeFile,
                nodes: fileTreeSate.nodes
            };
        }
        case TreeReducerActionType.FILE_CREATE: {
            set(fileTreeSate.nodes, TreeHelper.getStringPath(payload), { file: { contents: '' } });
            return {
                activeFolder: fileTreeSate.activeFolder,
                activeFile: payload,
                nodes: fileTreeSate.nodes
            };
        }
        default: {
            throw Error('Unknown action: ' + type);
        }
    }
}
