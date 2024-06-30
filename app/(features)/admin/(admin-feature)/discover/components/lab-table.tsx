import { tag } from '@/app/@types/tag';
import { userType } from '@/app/@types/user';
import Button from '@/app/components/globals/form/button';
import CodeLabTable, { GenericTableModel } from '../../components/table/generic-tabel';

export default function LabTable({
    currentPage,
    onPageChange,
    pageCount,
    labs,
    detailsClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    labs: Array<LabTableType>;
    detailsClicked: (lab: LabTableType) => void;
}) {
    function TableItem({ item, index }: { item: LabTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.name}</td>
                <td>
                    {item.description.length > 20
                        ? item.description.slice(0, 20) + ' ....'
                        : item.description}
                </td>
                <td>{item.commentCount} Comments</td>
                <td>{item.starCount} Stars</td>
                <td>{item.user.username}</td>
                <td>
                    <Button label="Details" color="any" onClick={() => detailsClicked(item)} />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<LabTableType>({
        currentPage: currentPage,
        items: labs,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: LabTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Comment count</th>
                    <th>Star Count</th>
                    <th>username</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface LabTableType extends GenericTableModel {
    id: string;
    labId?: string;
    name: string;
    description: string;
    commentCount: number;
    viewCount: number;
    clone: number;
    isStared: boolean;
    starCount: number;
    createdAt?: Date;
    user: userType;
    tags?: Array<tag>;
}
