import UserAvatar from "../user-avatar";
import Lab from "./lab";

const SubmittedLab = () => {
    return (
        <div className="bg-base-100 h-fit rounded-xl pb-2 flex flex-col gap-2">
            <Lab />
            <div className="px-4">
                <UserAvatar />
            </div>
        </div>
    );
}

export default SubmittedLab;