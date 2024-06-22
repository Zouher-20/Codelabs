'use client';

import { RoomType } from '@/app/@types/room';
import {
    getRoomAndTeacherDetails,
    submittedLabsInRoom
} from '@/app/api/(modules)/class-room/services/action';
import { EmptyState } from '@/app/components/page-state/empty';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CodeLabContainer from '../../components/container';
import ClassDescriptionComponent from '../../statistics/components/class-description';
import FeedbackModal from '../../statistics/components/feedback-modal';
import StatisticsContainer from '../../statistics/components/statistics_components';
import CloneLabComponent from './components/clone-lab-component';
import { FeedbackComponent } from './components/feed-back';

export default function ClassLabPage() {
    const currentParams = useSearchParams();
    const route = useRouter();
    useEffect(() => {
        const id = currentParams.get('roomId') ?? '-1';
        getRoomInfo({ id });
    }, []);

    const [roomLoading, setRoomLoading] = useState(true);
    const [roomError, setRoomError] = useState(null);
    const [roomInfo, setRoomInfo] = useState<RoomType | null>(null);

    const [submitRoomLoading, setSubmitRoomLoading] = useState(false);

    const getRoomInfo = async ({ id }: { id: string }) => {
        setRoomLoading(true);
        try {
            const res = await getRoomAndTeacherDetails({ romId: id });
            setRoomInfo({
                id: id,
                title: res.name,
                description: res.description,
                endAt: res.endAt,
                type: res.type,
                createdAt: res.createdAt,
                teatcher: {
                    email: res.classRom?.MemberClass[0].user.email ?? '',
                    id: res.classRom?.MemberClass[0].user.id ?? '',
                    name: res.classRom?.MemberClass[0].user.username ?? ''
                }
            });
        } catch (e: any) {
            setRoomError(e.message);
        } finally {
            setRoomLoading(false);
        }
    };

    const calculateDurationPercentage = ({ start, end }: { start: Date; end: Date }) => {
        const startTime = start.getTime();
        const endTime = end.getTime();
        const currentTime = new Date().getTime();

        const totalDurationMs = endTime - startTime;
        const remainingDurationMs = endTime - currentTime;
        const remainingPercentage = (remainingDurationMs / totalDurationMs) * 100;

        return Math.max(Math.min(Math.round(remainingPercentage), 100), 0); // Ensure the percentage is between 0 and 100
    };
    const onFeedbackClicked = () => {
        if (document) {
            (document.getElementById('feedback-modal') as HTMLFormElement)?.showModal();
        }
    };
    const onLabClicked = async () => {
        // const params = {
        //     id: ''
        // };
        // const queryString = new URLSearchParams(params).toString();
        // route.push('/lab' + '?' + queryString);
        const id = currentParams.get('roomId') ?? '-1';

        setSubmitRoomLoading(true);
        try {
            await submittedLabsInRoom({ jsonFile: '', romId: id });
            toast.success('submit lab done');
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            setSubmitRoomLoading(false);
        }
    };
    return (
        <div className="flex min-h-[550px] flex-col gap-2 p-3">
            <div className="flex w-full flex-wrap gap-2 md:w-1/4">
                <ManageState
                    loading={roomLoading}
                    error={roomError}
                    errorAndEmptyCallback={() => {
                        const id = currentParams.get('roomId') ?? '-1';
                    }}
                    customEmptyPage={
                        <CodeLabContainer>
                            <EmptyState />
                        </CodeLabContainer>
                    }
                    customLoadingPage={
                        <CodeLabContainer>
                            <LoadingState />
                        </CodeLabContainer>
                    }
                    loadedState={
                        <StatisticsContainer
                            color="#E3E354"
                            primaryText="Duration"
                            anotherText="Left"
                            series={[
                                calculateDurationPercentage({
                                    end: roomInfo?.endAt ?? new Date(),
                                    start: roomInfo?.createdAt ?? new Date()
                                }),
                                100 -
                                    calculateDurationPercentage({
                                        end: roomInfo?.endAt ?? new Date(),
                                        start: roomInfo?.createdAt ?? new Date()
                                    })
                            ]}
                            withAdd={false}
                        />
                    }
                    empty={false}
                />
            </div>
            <ManageState
                loading={roomLoading}
                error={roomError}
                errorAndEmptyCallback={() => {
                    const id = currentParams.get('roomId') ?? '-1';

                    getRoomInfo({ id });
                }}
                customLoadingPage={
                    <CodeLabContainer>
                        <LoadingState />
                    </CodeLabContainer>
                }
                loadedState={
                    <ClassDescriptionComponent
                        classDescription={roomInfo?.description ?? ''}
                        className={roomInfo?.title ?? ''}
                        classType={roomInfo?.type ?? ''}
                        endAt={roomInfo?.endAt.toLocaleString('en-US')}
                        createdAt={roomInfo?.createdAt.toLocaleString('en-US')}
                        teacher={roomInfo?.teatcher}
                    />
                }
                empty={false}
            />
            <div className="flex gap-2 max-md:flex-wrap">
                <FeedbackComponent feedbacks={[]} onClick={onFeedbackClicked} />
                <CloneLabComponent
                    buttonText="Clone To Start Coding"
                    onButtonClick={() => {
                        onLabClicked();
                    }}
                    loading={submitRoomLoading}
                />
            </div>
            <FeedbackModal
                room={roomInfo}
                onFeedbackChange={function ({ addedValue }: { addedValue: number }): void {}}
                open={false}
            />
            <CustomToaster />
        </div>
    );
}
