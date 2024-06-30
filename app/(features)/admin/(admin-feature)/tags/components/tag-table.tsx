import { Icon } from '@iconify/react/dist/iconify.js';
import CodeLabTable from '../../components/table/generic-tabel';

export default function TagsTable({
    currentPage,
    onPageChange,
    pageCount,
    tag,
    editTagButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    tag: Array<TagTableType>;
    editTagButtonClicked: (template: TagTableType) => void;
}) {
    function TableItem({ item, index }: { item: TagTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.name}</td>
                <td>{item.createdAt?.toLocaleString('en-US')}</td>
                <td className="flex justify-center">
                    <Icon
                        icon="solar:code-square-bold-duotone"
                        fontSize={30}
                        className="text-primary hover:cursor-pointer"
                        onClick={() => editTagButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<TagTableType>({
        currentPage: currentPage,
        items: tag,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: TagTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Created At</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface TagTableType {
    id: string;
    name: string;
    createdAt: Date;
}
