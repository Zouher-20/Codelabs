import { PropsWithChildren, createContext, useContext, useReducer } from 'react';

export const FileTreeContext = createContext(null);
export const FileTreeDispatchContext = createContext(null);
export function TreeContextProvider({ children }: PropsWithChildren) {
    const [tasks, dispatch] = useReducer(treeReducer, [], () => {});

    return (
        <>
            <FileTreeContext.Provider value={tasks}>
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
    FOLDER_OPEN,
    FILE_ACTIVATE
}

export function treeReducer(treePath, action) {
    switch (action.type) {
        case TreeReducerActionType.FILE_ACTIVATE: {
            // logic
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
