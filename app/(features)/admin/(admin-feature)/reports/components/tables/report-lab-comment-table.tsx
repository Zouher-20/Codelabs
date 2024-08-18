import Dropdown from '@/app/components/drop_down';
import { useRouter } from 'next/navigation';
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
    const route = useRouter();

    function TableItem({ item, index }: { item: ReportLabCommentTableType; index: number }) {
        const onDetailsClicked = () => {
            const params = {
                id: item.labId
            };
            const queryString = new URLSearchParams(params).toString();
            route.push('/admin/discover/details' + '?' + queryString);

            return;
        };
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.username}</td>
                <td>{item.comment}</td>
                <td>{item.text}</td>

                <td>
                    <Dropdown
                        items={[
                            {
                                color: 'text-primary',
                                icon: 'solar:info-circle-outline',
                                onClick: () => {
                                    onDetailsClicked();
                                },
                                text: 'Details',
                                withSpreator: false
                            },
                            {
                                color: 'text-red-500',
                                icon: 'solar:trash-bin-2-bold-duotone',
                                onClick: () => {
                                    deleteLabCommentButtonClicked(item);
                                },
                                show: true,
                                text: 'Delete'
                            }
                        ]}
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
    labId: string;
}
