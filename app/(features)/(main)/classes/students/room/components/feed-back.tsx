import { FeedbackType } from '@/app/@types/feedback';
import UserAvatar from '@/app/components/globals/user-avatar';
import imageDefault from '@/public/images/challenges/notFound.svg';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import CodeLabContainer from '../../../components/container';

function FeedbackListItem({
    feedback,
    showDeleteButton = false,
    deleteCallback
}: {
    feedback: FeedbackType;
    deleteCallback?: () => void;
    showDeleteButton?: boolean;
}) {
    return (
        <div className="my-1 flex w-full flex-col rounded-lg bg-base-200 p-3">
            <div className="flex justify-between">
                <UserAvatar user={feedback.user} />
                {showDeleteButton ? (
                    <Icon
                        onClick={deleteCallback}
                        icon="solar:trash-bin-2-bold-duotone"
                        className="size-6 text-red-500 hover:cursor-pointer"
                    />
                ) : undefined}
            </div>
            <p className="pl-12">{feedback.feedback}</p>
        </div>
    );
}

function FeedbackComponent({
    feedbacks,
    onClick,
    title
}: {
    feedbacks: Array<FeedbackType>;
    onClick: () => void;
    title?: string;
}) {
    return (
        <CodeLabContainer height={'18rem'} minWidth="64">
            <div className="flex w-full cursor-pointer flex-col p-2" onClick={onClick}>
                <p className="ml-3 font-bold">{title ?? 'Feedback'}</p>
                {feedbacks.length == 0 ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                        <Image src={imageDefault} alt="" className="my-5 h-1/3 self-center" />
                        <p>There is no comments yet</p>
                    </div>
                ) : (
                    <div className="carousel relative  rounded-box  p-2">
                        <div className="carousel-item flex w-full flex-col">
                            {feedbacks.map((e, index) => (
                                <div className="px-1" key={e + `${index}`}>
                                    <FeedbackListItem feedback={e} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </CodeLabContainer>
    );
}

export { FeedbackComponent, FeedbackListItem };
