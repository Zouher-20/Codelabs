import CodeLabTable, { GenericTableModel } from '../../components/table/generic-tabel';

export default function UsersTable({
    currentPage,
    onPageChange,
    pageCount,
    users
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    users: Array<UserTableType>;
}) {
    function TableItem({ item, index }: { item: UserTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.classes} classes</td>
                <td>{item.labs} Labs</td>
                <td>{item.plan}</td>
            </tr>
        );
    }

    return new CodeLabTable<UserTableType>({
        currentPage: currentPage,
        items: users,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: UserTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th></th>
                    <th>Users</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Classes</th>
                    <th>Labs</th>
                    <th>Plan</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface UserTableType extends GenericTableModel {
    id: number;
    name: string;
    email: string;
    plan: string;
    classes: number;
    labs: number;
}
