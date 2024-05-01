import { EmptyState } from './empty';
import { ErrorState } from './error';
import { LoadingState } from './loading';

export function ManageState({
    loading,
    error,
    errorAndEmptyCallback,
    loadedState,
    empty
}: {
    loading: boolean;
    error: string | null;
    errorAndEmptyCallback: () => void;
    loadedState: React.ReactNode;
    empty: boolean;
}) {
    return loading ? (
        <LoadingState />
    ) : error ? (
        <ErrorState text={error} callback={errorAndEmptyCallback} />
    ) : empty ? (
        <EmptyState />
    ) : (
        loadedState
    );
}
