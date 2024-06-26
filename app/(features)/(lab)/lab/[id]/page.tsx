import { getLabById } from '@/app/api/(modules)/lab/services/action';
import { FileSystemTree } from '@webcontainer/api';
import LabWrapper from '../../components/lab-wrapper';

// get lab from server , reboot and save methods

export default async function LabPage({ params }: { params: { id: string } }) {
    const labContents = await getLabById(params.id);
    const files: FileSystemTree = JSON.parse(labContents);
    return (
        labContents && (
            <div>
                <LabWrapper files={files} labId={params.id} />
            </div>
        )
    );
}
