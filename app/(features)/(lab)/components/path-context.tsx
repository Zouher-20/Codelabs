import { PropsWithChildren, createContext } from 'react';

export const PathContext = createContext<string[]>([]);

export default function PathContextProvider({
    value,
    children
}: PropsWithChildren<{ value: string[] }>) {
    return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
}
