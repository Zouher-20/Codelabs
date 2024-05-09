import CommentListComponent from '@/app/(features)/(main)/discover/components/comment_list';
import { LabTableType } from '@/app/(features)/admin/discover/components/lab-table';
import { FeedbackType } from '@/app/@types/feedback';
import {
    addCommentUserProjectLab,
    deleteMyCommentUserProjectLab,
    getCommentUserProjectLab
} from '@/app/api/(modules)/user-project/services/action';
import IconRenderer from '@/app/components/globals/icon';
import { LoadingState } from '@/app/components/page-state/loading';
import { ManageState } from '@/app/components/page-state/state_manager';
import { CustomToaster } from '@/app/components/toast/custom-toaster';
import { textField } from '@/app/schemas';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';

const CommentModal = ({
    lab,
    onCommentChange,
    open,
    myId
}: {
    myId: string;
    onCommentChange: ({ addedValue }: { addedValue: number }) => void;
    lab: LabTableType | null;
    open: boolean;
}) => {
    useEffect(() => {
        if (lab != null) {
            setPage(1);
            getLabComment({ currentPage: 1 });
        }
    }, [open]);
    const [totalCommentCount, setTotalCommentCount] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [commentLoading, setCommentLoading] = useState<boolean>(true);
    const [page, setPage] = useState(1);
    const [comment, setComment] = useState<Array<FeedbackType>>([]);
    const onClose = () => {
        (document.getElementById('comment-modal') as HTMLDialogElement).close();
    };
    const [loading, setLoading] = useState(false);
    const onSubmit = async () => {
        if (values.message.trim().length != 0) {
            setLoading(true);
            try {
                const res = await addCommentUserProjectLab({
                    comment: values.message.trim(),
                    userProjectId: lab?.id ?? ''
                });
                handleChange('message')('');
                setPage(1);
                await getLabComment({ currentPage: 1 });
                onCommentChange({ addedValue: 1 });
            } catch (e: any) {
                toast.error(e.message);
            } finally {
                setLoading(false);
            }
        }
    };
    const getLabComment = async ({ currentPage }: { currentPage: number }) => {
        setCommentLoading(true);
        setError(null);
        try {
            const res = await getCommentUserProjectLab({
                userProjectId: lab?.id ?? '',
                page: currentPage,
                pageSize: 10
            });
            setComment(
                res.comment.map<FeedbackType>(e => {
                    return {
                        id: e.id,
                        user: { ...e.user, name: e.user.username },
                        feedback: e.comment
                    };
                })
            );
            setTotalCommentCount(res.countOfComment);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setCommentLoading(false);
        }
    };
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: yup.object().shape({ textField }),
        onSubmit
    });
    const deleteCommentCallback = async (comment: FeedbackType) => {
        try {
            const res = await deleteMyCommentUserProjectLab({ commentId: comment.id });
            toast.success('delete comment done successfully');
            setPage(1);
            await getLabComment({ currentPage: 1 });
            onCommentChange({ addedValue: -1 });
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <dialog id="comment-modal" className="modal">
            <div className="modal-box flex min-h-96 max-w-5xl flex-col justify-between gap-4">
                <div className="flex gap-2">
                    <button onClick={onClose}>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Comment</h3>
                </div>
                <ManageState
                    loading={commentLoading}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getLabComment({ currentPage: page });
                    }}
                    loadedState={
                        <CommentListComponent
                            deleteCallback={deleteCommentCallback}
                            myId={myId}
                            currentPage={page}
                            onPageChange={({ index }: { index: number }) => {
                                setPage(index);
                                getLabComment({ currentPage: index });
                            }}
                            pageCount={totalCommentCount / 10}
                            comments={comment}
                        />
                    }
                    empty={comment.length == 0}
                />
                <div className="flex gap-4">
                    <div className="flex w-full flex-col gap-1 rounded-md bg-base-200">
                        <input
                            name="message"
                            type="text"
                            placeholder="enter message"
                            className="grow bg-transparent p-2"
                            value={values.message}
                            onChange={handleChange}
                        />
                    </div>
                    {loading ? (
                        <div className="w-10">
                            <LoadingState />
                        </div>
                    ) : (
                        <Icon
                            icon="solar:map-arrow-right-bold-duotone"
                            className={`size-10 cursor-pointer text-primary`}
                            onClick={onSubmit}
                        />
                    )}
                </div>
            </div>
            <CustomToaster />
        </dialog>
    );
};

export default CommentModal;
