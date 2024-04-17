'use client'
import { userType } from "@/app/@types/user";
import EditModal from "./editeModal";

const PersonalInfo = ({ user }: { user: userType }) => {

    const { name, email, bio, position } = user
    type userInfo = {
        name: string, email: string, bio?: string, position?: string
    }
    const userInfo: userInfo = { name, email, bio, position };

    function toggleModal() {
        if (document) {
            (document.getElementById('new-lab-modal') as HTMLFormElement)?.showModal();
        }
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-4 ">
                <h2 className="text-xl text-primary">User Information</h2>
                <button className="btn btn-sm bg-base-300 hover:text-primary" onClick={() => toggleModal()}>Edit</button>
            </div>
            <div className="flex flex-col gap-4 px-2">
                {Object.keys(userInfo).map((key) => (
                    <div className="flex flex-col " key={key}>
                        <p className="capitalize">{key}</p>
                        <p key={key} className="text-gray-500">
                            {(userInfo as any)[key]}
                        </p>
                    </div>
                ))}
            </div>
            <span className="divider "></span>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl text-primary">Account deletion</h2>
                <p className="text-gray-500 max-sm:text-center">In case of deletion you'll remove all your projects and personal data. Also you'll lose controll of projects in your organization</p>
                <button className="btn btn-sm bg-base-300 max-w-fit max-sm:self-center hover:text-error">delete my account</button>
            </div>
            <EditModal userInfo={userInfo} />
        </div>
    );
}

export default PersonalInfo;