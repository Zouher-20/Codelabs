import Dropdown from '@/app/components/drop_down';
import { useRouter } from 'next/navigation';
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
    const route = useRouter();

    function TableItem({ item, index }: { item: ReportClassTableType; index: number }) {
        const onDetailsClicked = () => {
            const params = {
                id: item.classId
            };
            const queryString = new URLSearchParams(params).toString();
            route.push('/admin/classes/statistics' + '?' + queryString);
            return;
        };
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`} key={item.id}>
                <td>{item.classname}</td>
                <td>{item.username}</td>
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
                                    deleteClassButtonClicked(item);
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
    classId: string;
}
