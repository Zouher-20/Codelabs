'use client';

import { RoomType } from '@/app/@types/room';
import { getClassRoomAndTeacherDetails } from '@/app/api/(modules)/class-room/services/action';
import { EmptyState } from '@/app/components/page-state/empty';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

    const getRoomInfo = async ({ id }: { id: string }) => {
        setRoomLoading(true);
        try {
            const res = await getClassRoomAndTeacherDetails({ classRomId: id });
            setRoomInfo({
                id: id,
                title: res.classDetails.name,
                description: res.classDetails.description,
                endAt: res.classDetails.endAt,
                type: res.classDetails.type,
                createdAt: res.classDetails.createdAt
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
                                })
                            ]}
                            withAdd={false}
                        />
                    }
                    empty={false}
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
                <FeedbackComponent feedbacks={[]} onClick={onFeedbackClicked} />
                <CloneLabComponent buttonText="Clone To Start Coding" onButtonClick={() => {}} />
            </div>
            <FeedbackModal comments={[]} />
        </div>
    );
}
