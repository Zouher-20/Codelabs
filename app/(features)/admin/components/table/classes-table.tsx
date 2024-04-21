import Button from '@/app/components/globals/form/button';
import PagginationComponent from './paggination-component';

export default function ClassesTable({
    currentPage,
    onPageChange,
    pageCount,
    classes
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    classes: Array<ClassTableType>;
}) {
    function TableItem({ item, index }: { item: ClassTableType; index: number }) {
        return (
            <tr className={`my-3 ${index % 2 == 0 ? 'bg-base-300' : ''}`}>
                <th>{item.id}</th>
                <td>{item.className}</td>
                <td>{item.teacherName}</td>
                <td>{item.memberCount} members</td>
                <td>{item.labCount} Labs</td>
                <td>{item.createdAt}</td>
                <td>
                    <Button label="Details" color="basic" onClick={() => {}} />
                </td>
            </tr>
        );
    }

    return (
        <div className="flex flex-col items-end gap-4">
            <div className="w-full overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Classes</th>
                            <th>Teacher</th>
                            <th>Member</th>
                            <th>Labs</th>
                            <th>Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((item, index) => {
                            return <TableItem index={index} item={item} key={index} />;
                        })}
                    </tbody>
                </table>
            </div>
            <div className="mr-3">
                <PagginationComponent
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                    pageCount={pageCount}
                />
            </div>
        </div>
    );
}

export interface ClassTableType {
    id: number;
    className: string;
    teacherName: string;
    memberCount: number;
    labCount: number;
    createdAt: string;
}
