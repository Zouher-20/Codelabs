'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CloneLabComponent from '../../../students/room/components/clone-lab-component';
import { FeedbackComponent } from '../../../students/room/components/feed-back';
import FeedbackModal from '../../components/feedback-modal';
import { LabModel } from '../../components/lab-list';

export default function ClassLabPage() {
    const currentParams = useSearchParams();
    const route = useRouter();
    const [labLoading, setLabLoading] = useState(true);
    const [labError, setLabError] = useState(null);
    const [labs, setLabs] = useState<LabModel | null>(null);
    useEffect(() => {}, []);
    const getClassProject = async () => {
        setLabLoading(true);
        try {
            const res = await getLabsSubmittedInRom({ page: 1, pageSize: 100, romId: id });

            const currentLab = res.labs.map<LabModel>(e => {
                return {
                    id: e.ClassProject?.id ?? '',
                    user: {
                        isTeacher: e.ClassProject?.memberClass?.isTeacher ?? false,
                        name: e.ClassProject?.memberClass?.user.username ?? '',
                        image: e.ClassProject?.memberClass?.user.userImage ?? '',
                        id: e.ClassProject?.memberClass?.user.id ?? '',
                        email: e.ClassProject?.memberClass?.user.email ?? '',
                        selected: UserState.notSelected
                    }
                };
            });
            setLabs(currentLab);
        } catch (e: any) {
            setLabError(e.message);
        } finally {
            setLabLoading(false);
        }
    };
    const handleLabClick = () => {
        const id = currentParams.get('classProjectId') ?? '-1';
        route.push('/lab' + '/' + id);

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
