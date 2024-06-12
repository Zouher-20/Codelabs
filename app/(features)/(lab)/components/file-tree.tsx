'use client';
import GlobalUtils from '@/app/utils/global-utils';
import { DirectoryNode, FileNode, FileSystemTree } from '@webcontainer/api';
import { useContext } from 'react';
import FileItem from './file-item';
import FolderItem from './folder-item';
import { PathContext } from './path-context';

export default function FileTree({ tree }: { tree: FileSystemTree }) {
    const path = useContext(PathContext);
    return (
        <>
            <div className="px-2 py-1">
                {Object.entries(tree).map(treeItem => {
                    if (!GlobalUtils.isNullOrUndefined((treeItem[1] as DirectoryNode).directory)) {
                        return (
                            <FolderItem
                                key={path.join() + treeItem[0]}
                                name={treeItem[0]}
                                node={treeItem[1] as DirectoryNode}
                            />
                        );
                    } else {
                        return (
                            <FileItem
                                key={path.join() + treeItem[0]}
                                name={treeItem[0]}
                                node={treeItem[1] as FileNode}
                            />
                        );
                    }
                })}
            </div>
        </>
    );
}
