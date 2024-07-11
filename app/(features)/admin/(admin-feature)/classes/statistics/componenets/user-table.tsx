import { ClassRoomUserType } from '@/app/@types/user';
import CodeLabList from '@/app/components/list/generic-list';

export default function StudentTable({
    currentPage,
    onPageChange,
    pageCount,
    students,
    deleteStudentButtonClicked
}: {
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    students: Array<ClassRoomUserType>;
    deleteStudentButtonClicked: (student: ClassRoomUserType) => void;
}) {
    function TableItem({ item, index }: { item: ClassRoomUserType; index: number }) {
        return (
            <div
                className="m-1 flex min-w-40 flex-col items-center rounded-xl bg-base-300 p-3 transition-transform duration-300 hover:scale-105 hover:cursor-pointer hover:shadow-lg"
                key={index}
            >
                {item?.image ? (
                    <div className="avatar">
                        <div className="w-20 rounded-3xl">
                            <img
                                src={item?.image?.replace(/\\/g, '/')}
                                alt={`${item?.name}'s avatar`}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="avatar placeholder">
                        <div className="w-20 rounded-full bg-neutral text-neutral-content">
                            <span className="text-l">{item?.name?.at(0) ?? ''}</span>
                        </div>
                    </div>
                )}
                <div className="h-2"></div>
                <p className="text-xl">{item.name}</p>
                <p className="text-xs">{item.isTeacher ? 'Teacher' : 'Student'}</p>
            </div>
        );
    }

    return new CodeLabList<ClassRoomUserType>({
        currentPage: currentPage,
        items: students,
        wrap: true,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        itemBuilder({ item, index }) {
            return TableItem({ item, index });
        }
    }).build();
}
