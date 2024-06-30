import { FeedbackType } from '@/app/@types/feedback';
import { RoomType } from '@/app/@types/room';
import { getSession } from '@/app/api/(modules)/auth/service/actions';
import {
    addFeedbackInForClassProjectInRom,
    getAllFeedbackInClassProject
} from '@/app/api/(modules)/class-room/services/action';
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
import FeedbackListComponent from './feedback_list_components';

const FeedbackModal = ({
    classProjectId,
    onFeedbackChange,
    open
}: {
    onFeedbackChange: ({ addedValue }: { addedValue: number }) => void;
    classProjectId: RoomType | null;
    open: boolean;
}) => {
    useEffect(() => {
        getServerData();
    }, [open]);
    const [totalFeedbackCount, setTotalFeedbackCount] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [feedbackLoading, setFeedbackLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string>('');
    const [page, setPage] = useState(1);
    const [feedback, setFeedback] = useState<Array<FeedbackType>>([]);
    const onClose = () => {
        (document.getElementById('feedback-modal') as HTMLDialogElement).close();
    };
    const [loading, setLoading] = useState(false);
    const getServerData = async () => {
        if (classProjectId != null) {
            setPage(1);
            const session = await getSession();
            if (session) {
                setUserId(session?.id);
            }
            getLabFeedback({ currentPage: 1 });
        }
    };
    const onSubmit = async () => {
        if (values.message.trim().length != 0) {
            setLoading(true);
            try {
                const res = await addFeedbackInForClassProjectInRom({
                    feedback: values.message.trim(),
                    labId: ''
                });
                handleChange('message')('');
                setPage(1);
                await getLabFeedback({ currentPage: 1 });
                onFeedbackChange({ addedValue: 1 });
            } catch (e: any) {
                toast.error(e.message);
            } finally {
                setLoading(false);
            }
        }
    };
    const getLabFeedback = async ({ currentPage }: { currentPage: number }) => {
        setFeedbackLoading(true);
        setError(null);
        try {
            const res = await getAllFeedbackInClassProject({
                page: currentPage,
                classProjectId: classProjectId?.id ?? '',
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
            setTotalFeedbackCount(res.feedbackCount);
        } catch (e: any) {
            setError(e.message);
            toast.error(e.message);
        } finally {
            setFeedbackLoading(false);
        }
    };
    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: yup.object().shape({ textField }),
        onSubmit
    });
    const deleteFeedbackCallback = async (feedback: FeedbackType) => {
        try {
            // const res = await deleteMyFeedbackUserProjectLab({ feedbackId: feedback.id });
            toast.success('delete feedback done successfully');
            setPage(1);
            await getLabFeedback({ currentPage: 1 });
            onFeedbackChange({ addedValue: -1 });
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    return (
        <dialog id="feedback-modal" className="modal">
            <div className="modal-box flex min-h-96 max-w-5xl flex-col justify-between gap-4">
                <div className="flex gap-2">
                    <button onClick={onClose}>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Feedback</h3>
                </div>
                <ManageState
                    loading={feedbackLoading}
                    error={error}
                    errorAndEmptyCallback={() => {
                        getLabFeedback({ currentPage: page });
                    }}
                    loadedState={
                        <FeedbackListComponent
                            deleteCallback={deleteFeedbackCallback}
                            myId={userId}
                            currentPage={page}
                            onPageChange={({ index }: { index: number }) => {
                                setPage(index);
                                getLabFeedback({ currentPage: index });
                            }}
                            pageCount={totalFeedbackCount / 10}
                            feedbacks={feedback}
                        />
                    }
                    empty={feedback.length == 0}
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

export default FeedbackModal;
