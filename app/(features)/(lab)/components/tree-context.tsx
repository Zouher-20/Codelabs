'use client';
import { FileSystemTree } from '@webcontainer/api';
import { cloneDeep, get, set, unset } from 'lodash';
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import TreeHelper from '../lab/tree-helper';
export interface FileTreeState {
    nodes: FileSystemTree;
    activeFile: string[];
    activeFolder: string[];
    activeFileName?: string;
}
export const FileTreeContext = createContext<FileTreeState>({
    nodes: {},
    activeFile: ['package.json'],
    activeFolder: [],
    activeFileName: 'package.json'
});

export const FileTreeDispatchContext = createContext<Dispatch<ITreeAction> | null>(null);
export function TreeContextProvider({
    children,
    nodes
}: PropsWithChildren<{ nodes: FileSystemTree }>) {
    const [fileTreeState, dispatch] = useReducer(treeReducer, {
        nodes,
        activeFile: ['package.json'],
        activeFolder: [],
        activeFileName: 'package.json'
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
            // if (setFileCb) setFileCb(get(fileTreeSate.nodes, TreeHelper.getParsedPath(payload)));
            return {
                activeFolder: fileTreeSate.activeFolder,
                activeFile: payload,
                nodes: fileTreeSate.nodes,
                activeFileName: [...payload].pop()
            };
        }
        case TreeReducerActionType.FOLDER_ACTIVATE: {
            return {
                activeFolder: payload,
                activeFile: fileTreeSate.activeFile,
                nodes: fileTreeSate.nodes,
                activeFileName: fileTreeSate.activeFileName
            };
        }
        case TreeReducerActionType.NODE_DELETE: {
            const newNodes = cloneDeep(fileTreeSate.nodes);
            unset(newNodes, TreeHelper.getParsedPath(payload, false));
            return {
                activeFolder: fileTreeSate.activeFolder,
                activeFile: ['package.json'],
                nodes: newNodes,
                activeFileName: 'package.json'
            };
        }
        case TreeReducerActionType.FOLDER_CREATE: {
            const alreadyExist = !!get(fileTreeSate, TreeHelper.getParsedPath(payload, false));
            console.log(alreadyExist);
            const newNodes = cloneDeep(fileTreeSate.nodes);
            set(newNodes, TreeHelper.getParsedPath(payload, false), { directory: {} });
            return {
                activeFolder: fileTreeSate.activeFolder,
                activeFile: fileTreeSate.activeFile,
                nodes: newNodes,
                activeFileName: fileTreeSate.activeFileName
            };
        }
        case TreeReducerActionType.FILE_CREATE: {
            const alreadyExist = !!get(
                fileTreeSate.nodes,
                TreeHelper.getParsedPath(payload, false)
            );
            if (!alreadyExist) {
                const newNodes = cloneDeep(fileTreeSate.nodes);
                set(newNodes, TreeHelper.getParsedPath(payload, false), {
                    file: { contents: '' }
                });
                return {
                    activeFolder: fileTreeSate.activeFolder,
                    activeFile: payload,
                    nodes: newNodes,
                    activeFileName: payload[payload.length - 1]
                };
            } else {
                return fileTreeSate;
            }
        }
        default: {
            throw Error('Unknown action: ' + type);
        }
    }
}
