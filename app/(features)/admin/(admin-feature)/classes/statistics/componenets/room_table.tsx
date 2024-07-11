import CodeLabList from '@/app/components/list/generic-list';
import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';

import { GenericTableModel } from '../../../components/table/generic-tabel';

export default function RoomTable({
    currentPage,
    onPageChange,
    pageCount,
    rooms,
    deleteRoomButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    rooms: Array<RoomTableType>;
    deleteRoomButtonClicked: (room: RoomTableType) => void;
}) {
    function TableItem({ item, index }: { item: RoomTableType; index: number }) {
        return (
            <Card className="mt-1 max-w-80 bg-base-300" placeholder={undefined}>
                <CardBody placeholder={undefined}>
                    <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mb-2"
                        placeholder={undefined}
                    >
                        UI/UX Review Check
                    </Typography>
                    <Typography placeholder={undefined}>
                        The place is close to Barceloneta Beach and bus stop just 2 min by walk and
                        near to &quot;Naviglio&quot; where you can enjoy the main night life in
                        Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0" placeholder={undefined}>
                    <Button placeholder={undefined}>Read More</Button>
                </CardFooter>
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
