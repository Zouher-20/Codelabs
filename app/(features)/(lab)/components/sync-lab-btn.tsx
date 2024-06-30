'use client';
import IconRenderer from '@/app/components/globals/icon';
import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useRef, useState } from 'react';
import { TreeReducerActionType, useTreeDispatch } from './tree-context';
dayjs.extend(relativeTime);

export default function SyncLabBtn() {
    const dispatch = useTreeDispatch();
    const [lastSyncDate, setLastSyncDate] = useState<Dayjs | null>();
    const [relativeLastSynced, setRelativeLastSynced] = useState<string>('');
    const interval = useRef<any>();
    const onSaveClicked = () => {
        setLastSyncDate(dayjs());
        if (dispatch) dispatch({ type: TreeReducerActionType.SYNC_LAB });
    };

    useEffect(() => {
        setRelativeLastSynced(dayjs(lastSyncDate).fromNow());
        if (interval.current) interval.current.clear;
        interval.current = setInterval(() => {
            setRelativeLastSynced(dayjs(lastSyncDate).fromNow());
        }, 60000);

        return () => clearInterval(interval.current);
    }, [lastSyncDate]);
    return (
        <>
            {lastSyncDate && (
                <time className="text-sm text-gray-400">Last Synced: {relativeLastSynced}</time>
            )}
            <button onClick={onSaveClicked} className="btn btn-info btn-sm font-bold">
                <IconRenderer
                    className="cursor-pointer text-[1.1rem] hover:opacity-75"
                    icon="solar:refresh-bold"
                />
                Sync
            </button>
        </>
    );
}
