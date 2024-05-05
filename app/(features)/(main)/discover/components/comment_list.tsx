import { FeedbackListItem } from '@/app/(features)/(main)/classes/students/room/components/feed-back';
import { FeedbackType } from '@/app/@types/feedback';
import CodeLabList from '@/app/components/list/generic-list';

export default function CommentListComponent({
    currentPage,
    onPageChange,
    pageCount,
    comments,
    myId,
    deleteCallback
}: {
    myId: string;
    currentPage: number;
    onPageChange: ({ index }: { index: number }) => void;
    pageCount: number;
    deleteCallback: (comment: FeedbackType) => void;
    comments: Array<FeedbackType>;
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
        items: comments,
        onChangePage: ({ page }: { page: number }) => onPageChange({ index: page }),
        pageCount: pageCount,
        itemBuilder: ({ item, index }: { item: FeedbackType; index: number }) => {
            return TableItem({ item: item, index: index });
        }
    }).build();
}
