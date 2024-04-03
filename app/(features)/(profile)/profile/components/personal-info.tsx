'use client'
import { userType } from "@/app/@types/user";
import EditModal from "./editeModal";

const PersonalInfo = ({ user }: { user: userType }) => {

    const { name, email, bio, location } = user
    type userInfo = {
        name: string, email: string, bio?: string, location?: string
    }
    const userInfo: userInfo = { name, email, bio, location };

    function toggleModal() {
        if (document) {
            (document.getElementById('new-lab-modal') as HTMLFormElement)?.showModal();
        }
    }
    return (
        <div className="flex flex-col">
            <div className="flex gap-4 mb-2">
                <h2 className="text-xl">User Information</h2>
                <button className="btn btn-sm bg-base-300" onClick={() => toggleModal()}>Edit</button>
            </div>
            <div className="flex flex-col gap-4">
                {Object.keys(userInfo).map((key) => (
                    <div className="flex flex-col " key={key}>
                        <p className="capitalize">{key}</p>
                        <p key={key} className="text-gray-500">
                            {(userInfo as any)[key]}
                        </p>
                    </div>
                ))}
            </div>
            <span className="divider h-1"></span>
            <div className="flex flex-col gap-2">
                <h2 className="text-xl ">User Information</h2>
                <p className="text-gray-500 max-sm:text-center">In case of deletion you'll remove all your projects and personal data. Also you'll lose controll of projects in your organization</p>
                <button className="btn btn-sm bg-base-300 max-w-fit max-sm:self-center">delete my account</button>
            </div>
            <EditModal userInfo={userInfo} />
        </div>
    );
}

export default PersonalInfo;