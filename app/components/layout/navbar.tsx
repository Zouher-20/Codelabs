import UserDropDown from './user-dropdown';

export default function Navbar() {
    return (
        <div className="bg-base-400 navbar">
            <div className=" flex flex-1 justify-between">
                <UserDropDown />
                <button className="btn btn-ghost text-primary">+ New Lab</button>
            </div>
        </div>
    );
}
