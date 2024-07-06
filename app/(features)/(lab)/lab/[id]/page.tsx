import { getSession } from '@/app/api/(modules)/auth/service/actions';
import { getLabById } from '@/app/api/(modules)/lab/services/action';
import { ROLE } from '@prisma/client';
import { FileSystemTree } from '@webcontainer/api';
import LabHeader from '../../components/lab-header';
import LabWrapper from '../../components/lab-wrapper';

// get lab from server , reboot and save methods

export default async function LabPage({ params }: { params: { id: string } }) {
    const lab = await getLabById(params.id);
    const files: FileSystemTree = JSON.parse(lab?.code as any);
    const session = await getSession();
    const isEditAllowed = session.id === lab?.author?.id || session.role === ROLE.ADMIN;

    return (
        lab &&
        lab?.code && (
            <div>
                <LabHeader name={lab?.name} author={lab?.author} labId={params.id}></LabHeader>
                <LabWrapper files={files} labId={params.id} isEditAllowed={isEditAllowed} />
            </div>
        )
    );
}
