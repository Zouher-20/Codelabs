'use client';

import { getClassProjectById } from '@/app/api/(modules)/class-room/services/action';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CloneLabComponent from '../../../students/room/components/clone-lab-component';
import { FeedbackComponent } from '../../../students/room/components/feed-back';
import FeedbackModal from '../../components/feedback-modal';
import { LabModel } from '../../components/lab-list';
import { ManageState } from '@/app/components/page-state/state_manager';

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
            const id = currentParams.get('classProjectId') ?? '-1';
            const res = await getClassProjectById({ classProjectId: id });
            setLabs({id:res.classProject.labId,user:{email:,name,image:,}});
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
        <ManageState
        empty={false}
        error={labError}
        errorAndEmptyCallback={()=>{}}
        loadedState={
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
        }
        loading={labLoading}/>
    );
}
