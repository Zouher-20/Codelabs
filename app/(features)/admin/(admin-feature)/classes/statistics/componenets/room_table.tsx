import CodeLabList from '@/app/components/list/generic-list';
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';

import { useRouter } from 'next/navigation';
import { GenericTableModel } from '../../../components/table/generic-tabel';

export default function RoomTable({
    currentPage,
    onPageChange,
    pageCount,
    rooms,
    withReadMoreButton
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    withReadMoreButton: boolean;
    rooms: Array<RoomTableType>;
}) {
    const route = useRouter();

    function TableItem({ item, index }: { item: RoomTableType; index: number }) {
        const onReadMoreClicked = () => {
            const params = {
                id: item.id
            };
            const queryString = new URLSearchParams(params).toString();
            route.push('/admin/classes/statistics/room' + '?' + queryString);
            return;
        };
        return (
            <Card className="mt-1 max-w-80 bg-base-300" placeholder={undefined} key={index}>
                <CardBody placeholder={undefined}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                        placeholder={undefined}
                    >
                        {item.name}
                    </Typography>
                    <Typography className="overflow-hidden text-ellipsis" placeholder={undefined}>
                        <div className="h-20 overflow-clip">{item.desription}</div>
                    </Typography>
                </CardBody>
                {withReadMoreButton && (
                    <CardFooter className="pt-0" placeholder={undefined}>
                        <Button
                            placeholder={undefined}
                            onClick={() => {
                                onReadMoreClicked();
                            }}
                        >
                            Read More
                        </Button>
                    </CardFooter>
                )}
            </Card>
        );
    }

    return new CodeLabList<RoomTableType>({
        currentPage: currentPage,
        items: rooms,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        itemBuilder: ({ item, index }: { item: RoomTableType; index: number }) => {
            return TableItem({ item: item, index: index });
        },
        wrap: true
    }).build();
}

export interface RoomTableType extends GenericTableModel {
    id: string;
    desription: string;
    name: string;
}
