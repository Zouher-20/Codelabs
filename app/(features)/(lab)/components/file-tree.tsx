import GlobalUtils from '@/app/utils/global-utils';
import { DirectoryNode, FileNode, FileSystemTree } from '@webcontainer/api';
import FileItem from './file-item';
import FolderItem from './folder-item';

export default function FileTree({ tree }: { tree: FileSystemTree }) {
    return (
        <>
            <div className="px-2 py-1">
                {Object.entries(tree).map(treeItem => {
                    if (!GlobalUtils.isNullOrUndefined((treeItem[1] as DirectoryNode).directory)) {
                        return (
                            <FolderItem
                                key={treeItem[0]}
                                name={treeItem[0]}
                                node={treeItem[1] as DirectoryNode}
                            />
                        );
                    } else {
                        return (
                            <FileItem
                                key={treeItem[0]}
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
