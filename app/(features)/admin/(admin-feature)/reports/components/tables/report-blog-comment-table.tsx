import Button from '@/app/components/globals/form/button';
import CodeBlogTable, { GenericTableModel } from '../../../components/table/generic-tabel';

export default function ReportBlogCommentTable({
    currentPage,
    onPageChange,
    pageCount,
    blogComments,
    deleteBlogCommentButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    blogComments: Array<ReportBlogCommentTableType>;
    deleteBlogCommentButtonClicked: (user: ReportBlogCommentTableType) => void;
}) {
    function TableItem({ item, index }: { item: ReportBlogCommentTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.username}</td>
                <td>{item.comment}</td>
                <td>{item.text}</td>

                <td>
                    <Button
                        label="Delete"
                        color="error"
                        onClick={() => deleteBlogCommentButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeBlogTable<ReportBlogCommentTableType>({
        currentPage: currentPage,
        items: blogComments,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: ReportBlogCommentTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        tableHeader: (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Comment</th>
                    <th>Message</th>
                </tr>
            </thead>
        )
    }).build();
}

export interface ReportBlogCommentTableType extends GenericTableModel {
    comment: string;
    username: string;
    text: string;
    commentId: string;
    id: string;
}
