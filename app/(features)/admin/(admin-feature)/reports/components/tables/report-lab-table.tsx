import Button from '@/app/components/globals/form/button';
import CodeLabTable, { GenericTableModel } from '../../../components/table/generic-tabel';

export default function ReportLabTable({
    currentPage,
    onPageChange,
    pageCount,
    labs,
    deleteLabsButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    labs: Array<ReportLabTableType>;
    deleteLabsButtonClicked: (user: ReportLabTableType) => void;
}) {
    function TableItem({ item, index }: { item: ReportLabTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.text}</td>

                <td>
                    <Button
                        label="Delete"
                        color="error"
                        onClick={() => deleteLabsButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<ReportLabTableType>({
        currentPage: currentPage,
        items: labs,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: ReportLabTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Message</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface ReportLabTableType extends GenericTableModel {
    name: string;
    description: string;
    text: string;
    labId: string;
    id: string;
}
