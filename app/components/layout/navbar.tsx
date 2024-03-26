import { Icon } from '@iconify/react/dist/iconify.js';
import Button from '../globals/form/button';
import UserDropDown from './user-dropdown';

export default function Navbar() {
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
                    <div className="w-2"></div>
                    <UserDropDown />
                </div>
                <Button label="+ New Lab" color="any" onClick={toggleModal} />
            </div>
        </div>
    );
}
