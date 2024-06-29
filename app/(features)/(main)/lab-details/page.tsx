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
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CloneToClassModal from './components/modal/clone_to_class_modal';
import CloneLabModal from './components/modal/new-lab';

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
            labId: res.lab.lab.id,
            description: res.lab.description ?? '',
            viewCount: res.viewCount,
            clone: res.lab.clone ?? 0,
            user: {
                email: res.lab.user.email,
                id: res.lab.user.id,
                userImage: res.lab.user.userImage ?? '',
                username: res.lab.user.username,
                name: res.lab.user.username ?? ''
            }
        });
    };
    const getLabComment = async ({ id }: { id: string }) => {
        const res = await getCommentUserProjectLab({ userProjectId: id, page: 1, pageSize: 10 });
        setComment(
            res.comment.map<FeedbackType>(e => {
                return {
                    id: e.id,
                    user: {
                        email: e.user.email,
                        id: e.user.id,
                        userImage: e.user.userImage,
                        username: e.user.username,
                        name: e.user.username
                    },
                    feedback: e.comment
                };
            })
        );
    };
    const handleLabClick = () => {
        route.push('/lab/' + lab?.labId);

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

    const dropdown = () => {
        return (
            <div className="dropdown dropdown-left">
                <div
                    tabIndex={0}
                    role="button"
                    className="flex cursor-pointer items-center gap-2 rounded-btn hover:opacity-85"
                >
                    <Icon icon="solar:menu-dots-bold-duotone" className="size-10 text-primary" />
                </div>

                <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow"
                >
                    <li
                        onClick={() => {
                            if (document) {
                                (
                                    document.getElementById('clone-lab-modal') as HTMLFormElement
                                )?.showModal();
                            }
                        }}
                    >
                        <div>
                            <Icon icon="solar:dna-bold-duotone" className="size-8 text-primary" />
                            Clone lab
                        </div>
                    </li>
                    <span className="divider my-0" />
                    <li
                        onClick={() => {
                            if (document) {
                                (
                                    document.getElementById('clone-lab-to-class') as HTMLFormElement
                                )?.showModal();
                            }
                        }}
                    >
                        <div>
                            <Icon
                                icon="solar:case-round-bold-duotone"
                                className="size-8 text-primary"
                            />
                            Clone to class
                        </div>
                    </li>
                </ul>
            </div>
        );
    };
    const onCloneClicked = async (values: {
        name: string;
        description: string;
        tags: Array<string>;
    }) => {
        const response2 = await fetch('/api/user-project/clone-from-user-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tagId: values.tags,
                description: values.description,
                name: values.name,
                labId: lab?.labId ?? ''
            })
        });
        const result2 = await response2.json();
        if (result2.statusCode >= 300) {
            throw new Error(result2.data);
        }
        toast.success('lab created successfully');

        route.push('/lab' + '/' + result2.data.labId);
    };
    const onCloneToClassClicked = async (values: {
        name: string;
        description: string;
        type: string;
        endAt: Date;
        classId: string;
    }) => {
        const response2 = await fetch('/api/user-project/clone-for-class', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: values.type,
                description: values.description,
                name: values.name,
                endAt: values.endAt,
                labId: lab?.labId ?? '',
                classRomId: values.classId
            })
        });
        const result2 = await response2.json();
        if (result2.statusCode >= 300) {
            throw new Error(result2.data);
        }
        toast.success('lab created successfully');

        route.push('/lab' + '/' + result2.data.labId);
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
                                    <div className="flex justify-between">
                                        <article className="line-clamp-5 text-wrap text-sm">
                                            {lab?.description}
                                        </article>
                                        {dropdown()}
                                    </div>
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
                                                              : index == 2
                                                                ? lab?.viewCount ?? 0
                                                                : lab?.clone,
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
            <CloneLabModal submitCallback={onCloneClicked} />
            <CloneToClassModal callbackFunction={onCloneToClassClicked} />
            <CommentModal myId={myId} lab={lab} open={open} onCommentChange={onCommentChange} />
        </div>
    );
}
