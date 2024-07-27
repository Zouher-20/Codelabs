import Button from '@/app/components/globals/form/button';
import CodeBlogTable, { GenericTableModel } from '../../../components/table/generic-tabel';

export default function ReportBlogTable({
    currentPage,
    onPageChange,
    pageCount,
    blogs,
    deleteBlogsButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    blogs: Array<ReportBlogTableType>;
    deleteBlogsButtonClicked: (user: ReportBlogTableType) => void;
}) {
    function TableItem({ item, index }: { item: ReportBlogTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>{item.text}</td>

                <td>
                    <Button
                        label="Delete"
                        color="error"
                        onClick={() => deleteBlogsButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeBlogTable<ReportBlogTableType>({
        currentPage: currentPage,
        items: blogs,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: ReportBlogTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>User</th>
                    <th>Message</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface ReportBlogTableType extends GenericTableModel {
    name: string;
    username: string;
    text: string;
    blogId: string;
    id: string;
}
