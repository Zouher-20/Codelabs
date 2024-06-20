import { TempletsTableType } from '@/app/@types/templetes';
import Button from '@/app/components/globals/form/button';
import CodeLabTable from '../../components/table/generic-tabel';

export default function TempletessTable({
    currentPage,
    onPageChange,
    pageCount,
    templetes,
    deleteTempletesButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    templetes: Array<TempletsTableType>;
    deleteTempletesButtonClicked: (user: TempletsTableType) => void;
}) {
    function TableItem({ item, index }: { item: TempletsTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.image}</td>
                <td>{item.name}</td>
                <td>{item.createdAt.toLocaleString('en-US')}</td>
                <td>
                    <Button
                        label="Delete"
                        color="error"
                        onClick={() => deleteTempletesButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<TempletsTableType>({
        currentPage: currentPage,
        items: templetes,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: TempletsTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Created At</th>
                </tr>
            </thead>
        )
    }).build();
}
