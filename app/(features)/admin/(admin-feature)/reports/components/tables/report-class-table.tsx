import Button from '@/app/components/globals/form/button';
import CodeLabTable, { GenericTableModel } from '../../../components/table/generic-tabel';

export default function ReportClassesTable({
    currentPage,
    onPageChange,
    pageCount,
    classes,
    deleteClassButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    classes: Array<ReportClassTableType>;
    deleteClassButtonClicked: (e: ReportClassTableType) => void;
}) {
    function TableItem({ item, index }: { item: ReportClassTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.classname}</td>
                <td>{item.username}</td>
                <td>{item.text}</td>

                <td>
                    <Button
                        label="Delete"
                        color="error"
                        onClick={() => deleteClassButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<ReportClassTableType>({
        currentPage: currentPage,
        items: classes,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: ReportClassTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>ClassName</th>
                    <th>teachername</th>
                    <th>Message</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface ReportClassTableType extends GenericTableModel {
    classname: string;
    username: string;
    text: string;
    userId: string;
    id: string;
}
