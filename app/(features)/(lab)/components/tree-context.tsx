'use client';
import { FileSystemTree, WebContainer } from '@webcontainer/api';
import { cloneDeep, set, unset } from 'lodash';
import { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react';
import TreeHelper from '../lab/tree-helper';
export interface FileTreeState {
    nodes: FileSystemTree;
    activeFile: string[];
    activeFolder: string[];
    activeFileName?: string;
    webContainerInstance: WebContainer | null;
    labId: string | null;
}
export const FileTreeContext = createContext<FileTreeState>({
    nodes: {},
    activeFile: ['package.json'],
    activeFolder: [],
    activeFileName: 'package.json',
    webContainerInstance: null,
    labId: null
});

export enum NodeType {
    file,
    folder
}
export const FileTreeDispatchContext = createContext<Dispatch<ITreeAction> | null>(null);
export function TreeContextProvider({
    children,
    nodes,
    labId
}: PropsWithChildren<{ nodes: FileSystemTree; labId: string }>) {
    const [fileTreeState, dispatch] = useReducer(treeReducer, {
        nodes,
        activeFile: ['package.json'],
        activeFolder: [],
        activeFileName: 'package.json',
        labId
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
    FILE_CREATE,
    FILE_UPDATE,
    SET_CONTAINER,
    SYNC_LAB
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
interface IFileUpdateAction {
    type: TreeReducerActionType.FILE_UPDATE;
    payload: string;
}
interface IFolderCreateAction {
    type: TreeReducerActionType.FOLDER_CREATE;
    payload: string[];
}

interface ISetContainerAction {
    type: TreeReducerActionType.SET_CONTAINER;
    payload: WebContainer;
}
interface ISyncLabAction {
    type: TreeReducerActionType.SYNC_LAB;
    payload?: undefined;
}

type ITreeAction =
    | IFileActivateAction
    | IFolderActivateAction
    | INodeDeleteAction
    | IFileCreateAction
    | IFolderCreateAction
    | IFileUpdateAction
    | ISetContainerAction
    | ISyncLabAction;

export function treeReducer(fileTreeState: FileTreeState, { type, payload }: ITreeAction) {
    switch (type) {
        case TreeReducerActionType.FILE_ACTIVATE: {
            // if (setFileCb) setFileCb(get(fileTreeState.nodes, TreeHelper.getParsedPath(payload)));
            return {
                activeFolder: fileTreeState.activeFolder,
                activeFile: payload,
                nodes: fileTreeState.nodes,
                activeFileName: [...payload].pop(),
                webContainerInstance: fileTreeState.webContainerInstance,
                labId: fileTreeState.labId
            };
        }
        case TreeReducerActionType.FOLDER_ACTIVATE: {
            return {
                activeFolder: payload,
                activeFile: fileTreeState.activeFile,
                nodes: fileTreeState.nodes,
                activeFileName: fileTreeState.activeFileName,
                webContainerInstance: fileTreeState.webContainerInstance,
                labId: fileTreeState.labId
            };
        }
        case TreeReducerActionType.NODE_DELETE: {
            const newNodes = cloneDeep(fileTreeState.nodes);
            unset(newNodes, TreeHelper.getParsedPath(payload, false));
            const actualPath = '/' + payload.join('/');

            fileTreeState.webContainerInstance?.fs.rm(actualPath, { recursive: true });
            return {
                activeFolder: fileTreeState.activeFolder,
                activeFile: ['package.json'],
                nodes: newNodes,
                activeFileName: 'package.json',
                webContainerInstance: fileTreeState.webContainerInstance,
                labId: fileTreeState.labId
            };
        }
        case TreeReducerActionType.FOLDER_CREATE: {
            const newNodes = cloneDeep(fileTreeState.nodes);
            set(newNodes, TreeHelper.getParsedPath(payload, false), { directory: {} });
            const actualPath =
                payload[0] === 'root'
                    ? '/' + payload.slice(1, payload.length).join('/')
                    : '/' + payload.join('/');
            fileTreeState.webContainerInstance?.fs
                .mkdir(actualPath, { recursive: true })
                .catch(() => {});
            return {
                activeFolder: fileTreeState.activeFolder,
                activeFile: fileTreeState.activeFile,
                nodes: newNodes,
                activeFileName: fileTreeState.activeFileName,
                webContainerInstance: fileTreeState.webContainerInstance,
                labId: fileTreeState.labId
            };
        }
        case TreeReducerActionType.FILE_CREATE: {
            const newNodes = cloneDeep(fileTreeState.nodes);
            set(newNodes, TreeHelper.getParsedPath(payload, false), {
                file: { contents: '' }
            });
            const actualPath =
                payload[0] === 'root'
                    ? '/' + payload.slice(1, payload.length).join('/')
                    : '/' + payload.join('/');

            fileTreeState.webContainerInstance?.fs.writeFile(actualPath, '').catch(() => {});
            return {
                activeFolder: fileTreeState.activeFolder,
                activeFile: payload,
                nodes: newNodes,
                activeFileName: payload[payload.length - 1],
                webContainerInstance: fileTreeState.webContainerInstance,
                labId: fileTreeState.labId
            };
        }
        case TreeReducerActionType.FILE_UPDATE: {
            const newNodes = cloneDeep(fileTreeState.nodes);
            set(newNodes, TreeHelper.getParsedPath(fileTreeState.activeFile, false), {
                file: { contents: payload }
            });

            return {
                activeFolder: fileTreeState.activeFolder,
                activeFile: fileTreeState.activeFile,
                nodes: newNodes,
                activeFileName: fileTreeState.activeFileName,
                webContainerInstance: fileTreeState.webContainerInstance,
                labId: fileTreeState.labId
            };
        }
        case TreeReducerActionType.SET_CONTAINER: {
            return {
                activeFolder: fileTreeState.activeFolder,
                activeFile: fileTreeState.activeFile,
                nodes: fileTreeState.nodes,
                activeFileName: fileTreeState.activeFileName,
                webContainerInstance: payload,
                labId: fileTreeState.labId
            };
        }
        case TreeReducerActionType.SYNC_LAB: {
            fetch('/api/lab/save-lab', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({
                    labId: fileTreeState.labId,
                    codeJsonContents: JSON.stringify(fileTreeState.nodes)
                })
            });
            return {
                activeFolder: fileTreeState.activeFolder,
                activeFile: fileTreeState.activeFile,
                nodes: fileTreeState.nodes,
                activeFileName: fileTreeState.activeFileName,
                webContainerInstance: cloneDeep(fileTreeState.webContainerInstance),
                labId: fileTreeState.labId
            };
        }
        default: {
            throw Error('Unknown action: ' + type);
        }
    }
}
