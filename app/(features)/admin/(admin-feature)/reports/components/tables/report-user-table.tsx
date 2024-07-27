import Button from '@/app/components/globals/form/button';
import CodeLabTable, { GenericTableModel } from '../../../components/table/generic-tabel';

export default function ReportUsersTable({
    currentPage,
    onPageChange,
    pageCount,
    users,
    deleteUserButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    users: Array<ReportUserTableType>;
    deleteUserButtonClicked: (user: ReportUserTableType) => void;
}) {
    function TableItem({ item, index }: { item: ReportUserTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.text}</td>

                <td>
                    <Button
                        label="Delete"
                        color="error"
                        onClick={() => deleteUserButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<ReportUserTableType>({
        currentPage: currentPage,
        items: users,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: ReportUserTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface ReportUserTableType extends GenericTableModel {
    name: string;
    email: string;
    text: string;
    userId: string;
    id: string;
}
