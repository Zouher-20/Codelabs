'use client';
import { deletTemplate } from '@/app/api/(modules)/admin/template/services/action';
import Button from '@/app/components/globals/form/button';
import IconRenderer from '@/app/components/globals/icon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DeleteTempletesModal = ({
    templateId,
    callback
}: {
    templateId: string;
    callback: () => void;
}) => {
    const [loadin, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            await deletTemplate({ templateId });
            callback();
            (document.getElementById('delete-templetes-modal') as HTMLDialogElement).close();
            toast.success("delete templete done");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <dialog id="delete-templetes-modal" className="modal">
            <div className="modal-box flex w-1/2 max-w-5xl flex-col gap-4 ">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Delete account</h3>
                </form>
                <p className="text-red-600">Are you sure you want to delete this templete</p>
                {loadin ? (
                    <div className="flex w-full justify-end">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <Button
                        style="w-fit self-end"
                        color="error"
                        label="Delete"
                        onClick={onSubmit}
                    />
                )}
            </div>
        </dialog>
    );
};

export default DeleteTempletesModal;
