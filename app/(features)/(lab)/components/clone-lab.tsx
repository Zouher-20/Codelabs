'use client';
import IconRenderer from '@/app/components/globals/icon';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CloneLabModal from '../../(main)/lab-details/components/modal/new-lab';

export default function CloneLabButton({ labId }: { labId: string }) {
    const router = useRouter();

    const onCloneClicked = async (values: {
        name: string;
        description: string;
        tags: Array<string>;
    }) => {
        const response2 = await fetch('/api/user-project/clone-from-user-project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tagId: values.tags,
                description: values.description,
                name: values.name,
                labId: labId
            })
        });
        const result2 = await response2.json();
        if (result2.statusCode >= 300) {
            throw new Error(result2.data);
        }
        toast.success('lab created successfully');

        window.location.href = window.location.origin + '/lab/' + result2.data.labId;
    };

    return (
        <>
            <button
                onClick={() => {
                    if (document) {
                        (
                            document.getElementById('clone-lab-modal') as HTMLFormElement
                        )?.showModal();
                    }
                }}
                className="btn btn-secondary btn-sm font-bold"
            >
                <IconRenderer className="text-[1.1rem]" icon="solar:copy-bold" />
                Clone
            </button>
            <CloneLabModal submitCallback={onCloneClicked} />
        </>
    );
}
