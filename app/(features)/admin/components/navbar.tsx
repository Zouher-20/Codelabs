import Button from '@/app/components/globals/form/button';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function AdminNavBar() {
    function toggleModal() {
        if (document) {
            (document.getElementById('new-lab-modal') as HTMLFormElement)?.showModal();
        }
    }

    return (
        <div className="navbar">
            <div className=" flex flex-1 justify-between">
                <div className="flex items-center">
                    <label htmlFor="my-drawer-2" className="cursor-pointer lg:hidden">
                        <Icon icon="solar:list-bold" className="size-8" />
                    </label>
                </div>
                <Button label="+ New Lab" color="any" onClick={toggleModal} />
            </div>
        </div>
    );
}
