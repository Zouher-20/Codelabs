'use client';

import { FeedbackType } from '@/app/@types/feedback';
import ClassDescriptionComponent from '../../statistics/components/class-description';
import FeedbackModal from '../../statistics/components/feedback-modal';
import StatisticsContainer from '../../statistics/components/statistics_components';
import CloneLabComponent from './components/clone-lab-component';
import { FeedbackComponent } from './components/feed-back';

export default function ClassLabPage() {
    var feedbacks: Array<FeedbackType> = [
        {
            id: '1',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmai.com', id: '1', name: 'majd' }
        },
        {
            id: '2',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmai.com', id: '1', name: 'majd' }
        },
        {
            id: '3',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmai.com', id: '2', name: 'majd2' }
        },
        {
            id: '4',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmai.com', id: '1', name: 'majd' }
        },
        {
            id: '5',
            feedback:
                'Purus lorem dolor dolor euismod lorem facilisi amet arcu mi. Dui amet massa sociis volutpat viverra donec augue sit. Suscipit elementum eget rhoncus sed facilisis nisi. Orci facilisis at fermentum vitae pellentesque. Fermentum nisl aliquam rhoncus ipsum fames est augue.',
            user: { email: 'alshalabi211@gmai.com', id: '3', name: 'majd3' }
        }
    ];
    const onFeedbackClicked = () => {
        if (document) {
            (document.getElementById('feedback-modal') as HTMLFormElement)?.showModal();
        }
    };

    return (
        <div className="flex min-h-[550px] flex-col gap-2 p-3">
            <div className="flex w-full flex-wrap gap-2 md:w-1/4">
                <StatisticsContainer
                    color="#50FA7B"
                    primaryText="Duration"
                    anotherText="left"
                    withAdd={false}
                />
            </div>
            <ClassDescriptionComponent
                classDescription="Lorem ipsum dolor sit amet consectetur. Ornare proin arcu amet fermentum
                        tristique ultrices. Lacus sed et senectus dictum duis morbi at. Pellentesque
                        duis aliquet lectus pellentesque tristique scelerisque. Lorem vitae senectus
                        vehicula id at interdum."
                className="room name"
                classType="type"
                teacher={{ name: 'majd', id: '1', email: 'alshalabi211@gmai.com' }}
            />
            <div className="flex gap-2 max-md:flex-wrap">
                <FeedbackComponent feedbacks={feedbacks} onClick={onFeedbackClicked} />
                <CloneLabComponent buttonText="Clone To Start Coding" onButtonClick={() => {}} />
            </div>
            <FeedbackModal comments={[]} />
        </div>
    );
}
