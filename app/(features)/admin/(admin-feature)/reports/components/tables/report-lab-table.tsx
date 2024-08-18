import Dropdown from '@/app/components/drop_down';
import { useRouter } from 'next/navigation';
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
    const route = useRouter();

    function TableItem({ item, index }: { item: ReportLabTableType; index: number }) {
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
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.text}</td>

                <td className="flex items-center justify-between">
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
                                    deleteLabsButtonClicked(item);
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
