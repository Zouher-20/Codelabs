import { FeedbackType } from '@/app/@types/feedback';
import IconRenderer from '@/app/components/globals/icon';
import { LoadingState } from '@/app/components/page-state/loading';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { FeedbackListItem } from '../../students/room/components/feed-back';

const FeedbackModal = ({ comments }: { comments: Array<FeedbackType> }) => {
    const onClose = () => {
        (document.getElementById('feedback-modal') as HTMLDialogElement).close();
    };
    const [loading, setLoading] = useState(false);
    const onMessageSent = async () => {};
    const [feedbackMessage, setFeedbackMessage] = useState('');

    function FeedbackField({
        value,
        onChange
    }: {
        value: string;
        onChange: (value: string) => void;
    }) {
        return (
            <div className="flex w-full flex-col gap-1 rounded-md bg-base-200">
                <input
                    type="text"
                    placeholder="feedback"
                    className="grow bg-transparent p-2"
                    value={value}
                    onChange={e => {
                        const value = e.target.value;
                        onChange(value);
                    }}
                />
            </div>
        );
    }

    return (
        <dialog id="feedback-modal" className="modal">
            <div className="modal-box flex min-h-96 max-w-5xl flex-col justify-between gap-4">
                <div className="flex gap-2">
                    <button onClick={onClose}>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Feedback</h3>
                </div>
                <div className="carousel relative rounded-box p-2">
                    <div className="carousel-item flex w-full flex-col gap-2">
                        {comments.map((e, index) => (
                            <div className="px-1" key={e + `${index}`}>
                                <FeedbackListItem feedback={e} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <FeedbackField
                        value={feedbackMessage}
                        onChange={message => {
                            setFeedbackMessage(message);
                        }}
                    />
                    {loading ? (
                        <LoadingState />
                    ) : (
                        <Icon
                            icon="solar:map-arrow-right-bold-duotone"
                            className={`size-10 cursor-pointer text-primary`}
                            onClick={onMessageSent}
                        />
                    )}
                </div>
            </div>
            <CustomToaster />
        </dialog>
    );
};

export default FeedbackModal;
