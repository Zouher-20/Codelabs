import RebootBtn from './RebootBtn';
import SyncLabBtn from './sync-lab-btn';

export default function EditorToolbar({ isEditAllowed }: { isEditAllowed: boolean }) {
    return (
        <div className="col-span-2 flex max-h-[10vh]  items-center justify-end gap-2 border-b border-base-100 bg-base-300 px-2 py-2 text-2xl">
            {isEditAllowed && <SyncLabBtn />}
            <RebootBtn />
        </div>
    );
}
