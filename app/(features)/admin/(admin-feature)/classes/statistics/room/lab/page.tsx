'use client';

import FeedbackModal from '@/app/(features)/(main)/classes/statistics/components/feedback-modal';
import CloneLabComponent from '@/app/(features)/(main)/classes/students/room/components/clone-lab-component';
import { FeedbackComponent } from '@/app/(features)/(main)/classes/students/room/components/feed-back';
import { FeedbackType } from '@/app/@types/feedback';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ClassLabPage() {
    var feedbacks: Array<FeedbackType> = [
        {
            id: '1',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmail.com', id: '1', name: 'majd' }
        },
        {
            id: '2',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmail.com', id: '2', name: 'majd' }
        },
        {
            id: '3',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmail.com', id: '3', name: 'majd2' }
        },
        {
            id: '4',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmail.com', id: '4', name: 'majd' }
        },
        {
            id: '5',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmail.com', id: '5', name: 'majd3' }
        }
    ];

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
                <FeedbackComponent feedbacks={feedbacks} onClick={onFeedbackClicked} />
                <CloneLabComponent buttonText="view lab" onButtonClick={handleLabClick} />
            </div>
            <FeedbackModal comments={[]} />
        </div>
    );
}
