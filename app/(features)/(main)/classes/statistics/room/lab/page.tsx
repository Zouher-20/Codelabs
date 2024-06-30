'use client';

import { FeedbackType } from '@/app/@types/feedback';
import {
    getAllFeedbackInClassProject,
    getClassProjectById
} from '@/app/api/(modules)/class-room/services/action';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CloneLabComponent from '../../../students/room/components/clone-lab-component';
import { FeedbackComponent } from '../../../students/room/components/feed-back';
import FeedbackModal from '../../components/feedback-modal';
import { LabModel } from '../../components/lab-list';

export default function ClassLabPage() {
    const currentParams = useSearchParams();
    const route = useRouter();
    const [labLoading, setLabLoading] = useState(true);
    const [labError, setLabError] = useState(null);
    const [lab, setLab] = useState<LabModel | null>(null);
    const [feedback, setFeedback] = useState<Array<FeedbackType>>([]);
    useEffect(() => {
        getClassProject();
        getLabFeedback();
    }, []);
    const getLabFeedback = async () => {
        try {
            const id = currentParams.get('classProjectId') ?? '-1';

            const res = await getAllFeedbackInClassProject({
                page: 1,
                classProjectId: id,
                pageSize: 10
            });
            setFeedback(
                res.feedbacks.map<FeedbackType>(e => {
                    return {
                        id: e.id ?? '',
                        user: {
                            email: e.memberClass.user.email ?? '',
                            id: e.memberClass.user.id ?? '',
                            userImage: e.memberClass.user.userImage ?? '',
                            username: e.memberClass.user.username ?? ''
                        },

                        feedback: e.feedback ?? ''
                    };
                })
            );
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    const getClassProject = async () => {
        setLabLoading(true);
        try {
            const id = currentParams.get('classProjectId') ?? '-1';
            const res = await getClassProjectById({ classProjectId: id });
            setLab({
                id: res.classProject.id,
                labId: res.classProject.labId,
                user: {
                    email: res.classProject.memberClass?.user.email ?? '',
                    name: res.classProject.memberClass?.user.username ?? '',
                    image: res.classProject.memberClass?.user.userImage ?? '',
                    id: res.classProject.memberClass?.user.id ?? '',
                    isTeacher: res.classProject.memberClass?.isTeacher ?? false
                }
            });
        } catch (e: any) {
            setLabError(e.message);
        } finally {
            setLabLoading(false);
        }
    };
    const handleLabClick = () => {
        route.push('/lab' + '/' + lab?.labId);

        return;
    };
    const onFeedbackClicked = () => {
        if (document) {
            (document.getElementById('feedback-modal') as HTMLFormElement)?.showModal();
        }
    };

    return (
        <div>
            <ManageState
                empty={false}
                error={labError}
                errorAndEmptyCallback={() => {}}
                loadedState={
                    <div className="flex min-h-[550px] flex-col gap-2 p-3">
                        <div className="flex gap-2 max-md:flex-wrap">
                            <FeedbackComponent feedbacks={feedback} onClick={onFeedbackClicked} />
                            <CloneLabComponent
                                buttonText="view lab"
                                onButtonClick={handleLabClick}
                            />
                        </div>
                        <FeedbackModal
                            onFeedbackChange={() => {
                                getLabFeedback();
                            }}
                            lab={lab}
                            open={false}
                        />
                    </div>
                }
                loading={labLoading}
            />
            <CustomToaster />
        </div>
    );
}
