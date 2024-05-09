'use client';

import CodeLabContainer from '@/app/(features)/(main)/classes/components/container';
import CloneLabComponent from '@/app/(features)/(main)/classes/students/room/components/clone-lab-component';
import { FeedbackComponent } from '@/app/(features)/(main)/classes/students/room/components/feed-back';
import CommentModal from '@/app/(features)/(main)/discover/components/comment-modal';
import { LabTableType } from '@/app/(features)/admin/(admin-feature)/discover/components/lab-table';
import { InteractionType } from '@/app/@types/Interaction';
import { FeedbackType } from '@/app/@types/feedback';
import { getSession } from '@/app/api/(modules)/auth/service/actions';
import {
    addAndDeleteStarUserProjectLab,
    getCommentUserProjectLab,
    getDetailsUserProjectLab
} from '@/app/api/(modules)/user-project/services/action';
import Interaction from '@/app/components/globals/lab/interaction';
import UserAvatar from '@/app/components/globals/user-avatar';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { interactions } from '@/app/constants/interactions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function LabDetails() {
    const [comments, setComment] = useState<Array<FeedbackType>>([]);
    const [lab, setLab] = useState<LabTableType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [myId, setMyId] = useState('');
    const params = useSearchParams();
    const route = useRouter();
    let labId = '';
    useEffect(() => {
        labId = params.get('id') ?? '';
        getServerData(labId);
    }, []);

    const getServerData = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await getLabDetails(id);
            await getLabComment({ id: id });
            const session = await getSession();
            if (session) {
                setMyId(session?.id);
            }
        } catch (error: any) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const getLabDetails = async (id: string) => {
        const res = await getDetailsUserProjectLab({ userProjectId: id });
        setLab({
            id: res.lab.id,
            name: res.lab.name ?? '',
            isStared: res.isStarred,
            createdAt: res.lab.createdAt ?? '',
            commentCount: res.commentCount,
            starCount: res.starCount,
            description: res.lab.description ?? '',
            user: {
                ...res.lab.user,
                name: res.lab.user.username
            }
        });
    };
    const getLabComment = async ({ id }: { id: string }) => {
        const res = await getCommentUserProjectLab({ userProjectId: id, page: 1, pageSize: 10 });
        setComment(
            res.comment.map<FeedbackType>(e => {
                return {
                    id: e.id,
                    user: { ...e.user, name: e.user.username },
                    feedback: e.comment
                };
            })
        );
    };
    const handleLabClick = () => {
        const id = '';
        const params = {
            id
        };
        const queryString = new URLSearchParams(params).toString();
        route.push('/lab' + '?' + queryString);

        return;
    };
    const onFeedbackClicked = () => {
        if (document) {
            setOpen(!open);
            (document.getElementById('comment-modal') as HTMLFormElement)?.showModal();
        }
    };
    const onCommentChange = ({ addedValue }: { addedValue: number }) => {
        getLabComment({ id: params.get('id') ?? '' });
        setLab({ ...lab!, commentCount: (lab?.commentCount ?? 0) + addedValue });
    };
    const onInteractionClicked = async (index: number) => {
        try {
            if (index == 0) {
                const action = !(lab?.isStared ?? false);
                await addAndDeleteStarUserProjectLab({
                    userProjectId: lab?.id ?? '',
                    action: action
                });
                if (action) {
                    toast.success('add star done successfully');
                    setLab({
                        ...lab!,
                        starCount: (lab?.starCount ?? 0) + 1,
                        isStared: true
                    });
                } else {
                    toast.success('star removed successfully');
                    setLab({
                        ...lab!,
                        starCount: (lab?.starCount ?? 0) - 1,
                        isStared: false
                    });
                }
            }
        } catch (e: any) {
            toast.error(e.message);
        }
    };
    return (
        <div className="flex min-h-[550px] flex-col gap-2 p-3">
            <ManageState
                loading={loading}
                error={error}
                errorAndEmptyCallback={() => {
                    getServerData(labId);
                }}
                loadedState={
                    <>
                        <div className="flex gap-2 max-md:flex-wrap">
                            <CloneLabComponent
                                buttonText="view lab"
                                onButtonClick={handleLabClick}
                            />

                            <CodeLabContainer height={'18rem'} minWidth="64">
                                <div className="flex w-full flex-col justify-center gap-5 p-5">
                                    <article className="line-clamp-5 text-wrap text-sm">
                                        {lab?.description}
                                    </article>

                                    <div className="flex gap-1">
                                        {interactions.map(
                                            (interaction: InteractionType, index: number) =>
                                                Interaction({
                                                    icon: interaction.icon,
                                                    isSelected:
                                                        (index == 0 && lab?.isStared) || index != 0,
                                                    onClick: () => {
                                                        onInteractionClicked(index);
                                                    },
                                                    number:
                                                        index == 0
                                                            ? lab?.starCount
                                                            : index == 3
                                                              ? lab?.commentCount
                                                              : 0,
                                                    style: interaction.style,
                                                    key: index
                                                })
                                        )}
                                    </div>
                                    <UserAvatar user={lab?.user}></UserAvatar>
                                </div>
                            </CodeLabContainer>
                        </div>
                        <div>
                            <FeedbackComponent
                                feedbacks={comments}
                                onClick={onFeedbackClicked}
                                title="Comments"
                            />
                        </div>
                    </>
                }
                empty={false}
            />
            <CustomToaster />
            <CommentModal myId={myId} lab={lab} open={open} onCommentChange={onCommentChange} />
        </div>
    );
}
