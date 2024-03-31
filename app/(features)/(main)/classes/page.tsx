'use client';

import { classType } from '@/app/@types/class';
import ClassesList from './components/class-list-container';
import CreateClassContainer from './components/create-button-container';
import EmptyClasses from './components/empty';
import InfoContainer from './components/info-container';
import NewClassModal from './components/new-class-modal';

export default function LabsPage() {
    var createdClasses: Array<classType> = [
        { id: 1, title: 'majd1' },
        { id: 2, title: 'majd2' },
        { id: 3, title: 'majd3' },
        { id: 4, title: 'majd4' },
        { id: 5, title: 'majd5' }
    ];
    var joinedClasses: Array<classType> = [
        { id: 1, title: 'majd1' },
        { id: 2, title: 'majd2' },
        { id: 3, title: 'majd3' },
        { id: 4, title: 'majd4' },
        { id: 5, title: 'majd5' }
    ];
    var resultComponenet;
    if (createdClasses.length == 0 && joinedClasses.length == 0) {
        resultComponenet = <EmptyClasses></EmptyClasses>;
    } else {
        resultComponenet = (
            <div className="flex w-full flex-col gap-2 p-3">
                <div className="flex w-full flex-1 flex-wrap gap-2">
                    <CreateClassContainer
                        onClick={() => {
                            if (document) {
                                (
                                    document.getElementById('new-class-modal') as HTMLFormElement
                                )?.showModal();
                            }
                        }}
                    />
                    <ClassesList classes={createdClasses} title="Classes Created" />
                    <ClassesList classes={joinedClasses} title="Classes joined" />
                </div>
                <InfoContainer />
            </div>
        );
    }
    return (
        <div className="flex min-h-[550px] flex-col items-center justify-center ">
            {resultComponenet}
            <NewClassModal />
        </div>
    );
}
