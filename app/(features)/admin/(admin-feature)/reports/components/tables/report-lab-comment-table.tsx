import Button from '@/app/components/globals/form/button';
import CodeLabTable, { GenericTableModel } from '../../../components/table/generic-tabel';

export default function ReportLabCommentTable({
    currentPage,
    onPageChange,
    pageCount,
    labComments,
    deleteLabCommentButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    labComments: Array<ReportLabCommentTableType>;
    deleteLabCommentButtonClicked: (user: ReportLabCommentTableType) => void;
}) {
    function TableItem({ item, index }: { item: ReportLabCommentTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.username}</td>
                <td>{item.comment}</td>
                <td>{item.text}</td>

                <td>
                    <Button
                        label="Delete"
                        color="error"
                        onClick={() => deleteLabCommentButtonClicked(item)}
                    />
                </td>
            </tr>
        );
    }

    return new CodeLabTable<ReportLabCommentTableType>({
        currentPage: currentPage,
        items: labComments,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        tabelRowBuilder: ({ item, index }: { item: ReportLabCommentTableType; index: number }) => {
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

export interface ReportLabCommentTableType extends GenericTableModel {
    comment: string;
    username: string;
    text: string;
    commentId: string;
    id: string;
}
