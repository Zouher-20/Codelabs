'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import CloneLabComponent from '../../../students/room/components/clone-lab-component';
import { FeedbackComponent } from '../../../students/room/components/feed-back';
import FeedbackModal from '../../components/feedback-modal';

export default function ClassLabPage() {
    const currentParams = useSearchParams();
    const route = useRouter();

    const handleLabClick = () => {
        const id = currentParams.get('labId') ?? '-1';
        const params = {
            id
        };
        const queryString = new URLSearchParams(params).toString();
        route.push('/lab' + '?' + queryString);

        return;
    };
    const onFeedbackClicked = () => {
        if (document) {
            (document.getElementById('feedback-modal') as HTMLFormElement)?.showModal();
        }
    };

    return (
        <div className="flex min-h-[550px] flex-col gap-2 p-3">
            <div className="flex gap-2 max-md:flex-wrap">
                <FeedbackComponent feedbacks={[]} onClick={onFeedbackClicked} />
                <CloneLabComponent buttonText="view lab" onButtonClick={handleLabClick} />
            </div>
            <FeedbackModal
                onFeedbackChange={function ({ addedValue }: { addedValue: number }): void {}}
                room={null}
                open={false}
            />
        </div>
    );
}
