import { FeedbackType } from '@/app/@types/feedback';
import UserAvatar from '@/app/components/globals/user-avatar';
import CodeLabContainer from '../../../components/container';
function FeedbackListItem({ feedback }: { feedback: FeedbackType }) {
    return (
        <div className="flex w-full flex-col rounded-lg bg-base-200 p-3">
            <UserAvatar user={feedback.user} />
            <p className="pl-2">{feedback.feedback}</p>
        </div>
    );
}
function FeedbackComponent({
    feedbacks,
    onClick
}: {
    feedbacks: Array<FeedbackType>;
    onClick: () => void;
}) {
    return (
        <CodeLabContainer height={'18rem'} minWidth="64">
            <div className="flex w-full cursor-pointer flex-col p-2" onClick={onClick}>
                <p className="ml-3">Feedback</p>
                <div className="carousel relative  rounded-box  p-2">
                    <div className="carousel-item flex w-full flex-col gap-2">
                        {feedbacks.map((e, index) => (
                            <div className="px-1" key={e + `${index}`}>
                                <FeedbackListItem feedback={e} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CodeLabContainer>
    );
}

export { FeedbackComponent, FeedbackListItem };
