import UserDropDown from './user-dropdown';
import Button from '../globals/form/button';

export default function Navbar() {

    function toggleModal() {
        if (document) {
            (document.getElementById('new-lab-modal') as HTMLFormElement)?.showModal();
        }
    }

    return (
        <div className="bg-base-400 navbar">
            <div className=" flex flex-1 justify-between">
                <UserDropDown />
                <Button label='+ New Lab' color='any' onClick={toggleModal} />
            </div>
        </div>
    );
}
