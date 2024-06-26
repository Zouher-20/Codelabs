import Button from '@/app/components/globals/form/button';
import CodeLabTable, { GenericTableModel } from './generic-tabel';

export default function ClassesTable({
    currentPage,
    onPageChange,
    pageCount,
    classes,
    onDetailsButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    classes: Array<ClassTableType>;
    onDetailsButtonClicked: ({ currentClass }: { currentClass: ClassTableType }) => void;
}) {
    function TableItem({
        item,
        index,
        onDetailsButtonClicked
    }: {
        item: ClassTableType;
        index: number;
        onDetailsButtonClicked: ({ currentClass }: { currentClass: ClassTableType }) => void;
    }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`}>
                <td>{item.className}</td>
                <td>{item.teacherName}</td>
                <td>{item.memberCount} members</td>
                <td>{item.labCount} Rooms</td>
                <td>{item.createdAt}</td>
                <td>
                    <Button
                        label="Details"
                        color="basic"
                        onClick={() => onDetailsButtonClicked({ currentClass: item })}
                    />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<ClassTableType>({
        currentPage: currentPage,
        items: classes,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: ClassTableType; index: number }) => {
            return TableItem({ item: item, index: index, onDetailsButtonClicked });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Classes</th>
                    <th>Teacher</th>
                    <th>Member</th>
                    <th>Rooms</th>
                    <th>Created</th>
                    <th></th>
                </tr>
            </thead>
        )
    }).build();
}

export interface ClassTableType extends GenericTableModel {
    id: string;
    className: string;
    teacherName: string;
    memberCount: number;
    labCount: number;
    createdAt: string;
}
