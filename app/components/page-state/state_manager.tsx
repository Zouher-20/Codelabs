import { EmptyState } from './empty';
import { ErrorState } from './error';
import { LoadingState } from './loading';

export function ManageState({
    loading,
    error,
    errorAndEmptyCallback,
    loadedState,
    empty,
    customEmptyPage,
    customLoadingPage
}: {
    loading: boolean;
    error: string | null;
    errorAndEmptyCallback: () => void;
    loadedState: React.ReactNode;
    empty: boolean;
    customEmptyPage?: React.ReactNode;
    customLoadingPage?: React.ReactNode;
}) {
    return loading ? (
        customLoadingPage ?? <LoadingState />
    ) : error ? (
        <ErrorState text={error} callback={errorAndEmptyCallback} />
    ) : empty ? (
        customEmptyPage ?? <EmptyState />
    ) : (
        loadedState
    );
}
