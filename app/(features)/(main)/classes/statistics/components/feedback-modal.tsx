import { FeedbackType } from '@/app/@types/feedback';
import IconRenderer from '@/app/components/globals/icon';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { FeedbackListItem } from '../../students/room/components/feed-back';

const FeedbackModal = () => {
    const onClose = () => {
        (document.getElementById('feedback-modal') as HTMLDialogElement).close();
    };
    const onMessageSent = () => {
        console.log(feedbackMessage);
    };
    var feedbacks: Array<FeedbackType> = [
        {
            id: 1,
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { id: 1, name: 'majd' }
        },
        {
            id: 2,
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { id: 1, name: 'majd' }
        },
        {
            id: 3,
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { id: 2, name: 'majd2' }
        },
        {
            id: 4,
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { id: 1, name: 'majd' }
        },
        {
            id: 5,
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { id: 3, name: 'majd3' }
        }
    ];
    const [feedbackMessage, setFeedbackMessage] = useState('');

    function FeedbackFeild({
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
                        var value = e.target.value;
                        onChange(value);
                    }}
                />
            </div>
        );
    }

    return (
        <dialog id="feedback-modal" className="modal">
            <div className="modal-box flex min-h-96 max-w-5xl flex-col gap-4">
                <div className="flex gap-2">
                    <button onClick={onClose}>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Feedback</h3>
                </div>
                <div className="carousel relative  rounded-box  p-2">
                    <div className="carousel-item flex w-full flex-col gap-2">
                        {feedbacks.map((e, index) => (
                            <div className="px-1" key={e + `${index}`}>
                                <FeedbackListItem feedback={e} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <FeedbackFeild
                        value={feedbackMessage}
                        onChange={message => {
                            setFeedbackMessage(message);
                        }}
                    />
                    <Icon
                        icon="solar:map-arrow-right-bold-duotone"
                        className={`size-10 cursor-pointer text-primary`}
                        onClick={onMessageSent}
                    />
                </div>
            </div>
        </dialog>
    );
};

export default FeedbackModal;
