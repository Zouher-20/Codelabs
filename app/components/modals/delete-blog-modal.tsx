'use client';

import Button from '@/app/components/globals/form/button';
import IconRenderer from '@/app/components/globals/icon';

const DeleteBlogModal = ({ onDelete }: { onDelete: (val: boolean) => void }) => {

    const onSubmit = () => {
        onDelete(true);
        (document.getElementById('delete-blog-modal') as HTMLDialogElement).close();
    };

    return (
        <dialog id="delete-blog-modal" className="modal">
            <div className="modal-box flex w-8/12 max-w-3xl flex-col gap-4 p-8">
                <form className="flex gap-2" method="dialog">
                    <button>
                        <IconRenderer fontSize={24} icon="solar:arrow-left-linear" />
                    </button>
                    <h3 className="slef-center text-2xl font-bold">Delete Blog</h3>
                </form>
                <div className="flex w-full flex-col gap-2 px-8">
                    <p>
                        Are you sure you want to delete this blog
                    </p>
                    <Button label="Delete Plan" color="error" onClick={onSubmit} style="w-28 self-end" />
                </div>
            </div>
        </dialog>
    );
};

export default DeleteBlogModal;
