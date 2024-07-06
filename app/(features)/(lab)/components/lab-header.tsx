import { User } from '@prisma/client';
import BackBtn from './back-btn';
import CloneLabButton from './clone-lab';

export default function LabHeader({
    name,
    author,
    labId
}: {
    name: string | null;
    author: User | null;
    labId: string;
}) {
    return (
        <>
            <div className="flex max-h-[8vh] items-center justify-between p-2">
                <div className="flex items-center gap-2">
                    <BackBtn />
                    <img
                        src={`http://localhost:3000${author?.userImage?.replace(/\\/g, '/')}`}
                        alt="user-image"
                        width={40}
                        height={40}
                    />
                    <div className="flex  flex-col">
                        <div className="text-xl">{name}</div>
                        {author && <small className="text-sm">{author.username}</small>}
                    </div>
                </div>
                <div>
                    <CloneLabButton labId={labId} />
                </div>
            </div>
        </>
    );
}
