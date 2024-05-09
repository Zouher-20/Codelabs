'use client';

import { planType } from '@/app/@types/plan';
import Button from '@/app/components/globals/form/button';
import IconRenderer from '@/app/components/globals/icon';

const DeletePlanModal = ({
    plan,
    onDelete
}: {
    plan: planType | null;
    onDelete: (val: planType | null) => void;
}) => {
    const onSubmit = () => {
        onDelete(plan);
        (document.getElementById('delete-plan-modal') as HTMLDialogElement).close();
    };
    return (
        <dialog id="delete-plan-modal" className="modal">
            <div className="modal-box flex w-8/12 max-w-3xl flex-col gap-4 p-8">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Delete Plan</h3>
                </form>
                <div className="flex w-full flex-col items-end gap-2">
                    <p>
                        Are you sure you want to delete this plan ,if there is any user subscribe to
                        this plan this plan can't be deleted
                    </p>
                    <Button label="Delete Plan" color="error" onClick={onSubmit} style="w-28" />
                </div>
            </div>
        </dialog>
    );
};

export default DeletePlanModal;
