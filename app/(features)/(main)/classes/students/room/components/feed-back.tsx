import { FeedbackType } from '@/app/@types/feedback';
import { addReport } from '@/app/api/(modules)/report/services/action';
import { ReportType } from '@/app/api/core/constant/enum';
import Dropdown from '@/app/components/drop_down';
import UserAvatar from '@/app/components/globals/user-avatar';
import { SwalUtil } from '@/app/utils/swal-util';
import imageDefault from '@/public/images/challenges/notFound.svg';
import Image from 'next/image';
import toast from 'react-hot-toast';
import CodeLabContainer from '../../../components/container';

function FeedbackListItem({
    feedback,
    showDeleteButton = false,
    deleteCallback,
    fromLab = false
}: {
    feedback: FeedbackType;
    deleteCallback?: () => void;
    showDeleteButton?: boolean;
    fromLab?: boolean;
}) {
    const reportLab = async (message: string) => {
        try {
            const res = await addReport({
                commentUserProjectId: feedback.id,
                messageReport: message,
                reportType: ReportType.COMMENT_USER_PROJECT
            });
            toast.success(res);
        } catch (err: any) {
            toast.error(err.message);
        }
    };
    return (
        <div className="my-1 flex w-full flex-col rounded-lg bg-base-200 p-3">
            <div className="flex justify-between">
                <UserAvatar user={feedback.user} />
                <Dropdown
                    items={[
                        {
                            color: 'text-red-500',
                            icon: 'solar:trash-bin-2-bold-duotone',
                            onClick: () => {
                                if (deleteCallback != null) {
                                    (
                                        document.getElementById(
                                            'comment-modal'
                                        ) as HTMLDialogElement
                                    ).close();

                                    SwalUtil.showConfirm(() => {
                                        deleteCallback();
                                    });
                                }
                            },
                            text: 'Delete',
                            show: false,
                            withSpreator: false
                        },
                        {
                            color: 'text-red-500',
                            icon: 'solar:masks-bold-duotone',
                            onClick: () => {
                                (
                                    document.getElementById('comment-modal') as HTMLDialogElement
                                ).close();

                                SwalUtil.showReportModalWithTextArea((text: string) => {
                                    reportLab(text);
                                });
                            },
                            text: 'Report lab'
                        }
                    ]}
                />
            </div>
            <p className="pl-12">{feedback.feedback}</p>
        </div>
    );
}

function FeedbackComponent({
    feedbacks,
    onClick,
    title
}: {
    feedbacks: Array<FeedbackType>;
    onClick: () => void;
    title?: string;
}) {
    return (
        <CodeLabContainer height={'18rem'} minWidth="64">
            <div className="flex w-full cursor-pointer flex-col p-2" onClick={onClick}>
                <p className="ml-3 font-bold">{title ?? 'Feedback'}</p>
                {feedbacks.length == 0 ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
                        <Image src={imageDefault} alt="" className="my-5 h-1/3 self-center" />
                        <p>There is no comments yet</p>
                    </div>
                ) : (
                    <div className="carousel relative  rounded-box  p-2">
                        <div className="carousel-item flex w-full flex-col">
                            {feedbacks.map((e, index) => (
                                <div className="px-1" key={e + `${index}`}>
                                    <FeedbackListItem feedback={e} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </CodeLabContainer>
    );
}

export { FeedbackComponent, FeedbackListItem };
