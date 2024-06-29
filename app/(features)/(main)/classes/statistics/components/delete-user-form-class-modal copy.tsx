'use client';
import { deleteUserFromMyClass } from '@/app/api/(modules)/class-room/services/action';
import Button from '@/app/components/globals/form/button';
import IconRenderer from '@/app/components/globals/icon';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DeleteUserFromClassModal = ({
    classId,
    callback,
    userId
}: {
    classId: string;
    userId: string;
    callback: () => void;
}) => {
    const [loadin, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        try {
            await deleteUserFromMyClass({ classRoomId: classId, userIds: [userId] });
            callback();
            (document.getElementById('delete-user-from-class-modal') as HTMLDialogElement).close();
            toast.success('delete user done');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <dialog id="delete-user-from-class-modal" className="modal">
            <div className="modal-box flex w-1/2 max-w-5xl flex-col gap-4 ">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Delete User From Class</h3>
                </form>
                <p className="text-red-600">
                    Are you sure you want to delete this user from this class
                </p>

                <div className="flex justify-end">
                    <Button
                        style="w-fit self-end"
                        color="error"
                        label="Delete"
                        loading={loadin}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </dialog>
    );
};

export default DeleteUserFromClassModal;
