import { FeedbackListItem } from '@/app/(features)/(main)/classes/students/room/components/feed-back';
import { FeedbackType } from '@/app/@types/feedback';
import CodeLabList from '@/app/components/list/generic-list';

export default function FeedbackListComponent({
    currentPage,
    onPageChange,
    pageCount,
    feedbacks,
    myId,
    deleteCallback
}: {
    myId: string;
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    deleteCallback: (feedback: FeedbackType) => void;
    feedbacks: Array<FeedbackType>;
}) {
    function TableItem({ item, index }: { item: FeedbackType; index: number }) {
        return (
            <FeedbackListItem
                deleteCallback={() => {
                    deleteCallback(item);
                }}
                showDeleteButton={item.user.id == myId}
                feedback={item}
                key={index}
            />
        );
    }

    return new CodeLabList<FeedbackType>({
        currentPage: currentPage,
        items: feedbacks,
        wrap: false,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        itemBuilder: ({ item, index }: { item: FeedbackType; index: number }) => {
            return TableItem({ item: item, index: index });
        }
    }).build();
}
