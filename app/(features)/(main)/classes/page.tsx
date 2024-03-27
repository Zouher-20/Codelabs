'use client';

import ClassesList from './components/class-list-container';
import CreateClassContainer from './components/create-button-container';
import EmptyClasses from './components/empty';
import InfoContainer from './components/info-container';

export default function LabsPage() {
    var createdClasses: Array<string> = ['majd', 'majd2', 'majd3', 'majd4', 'majd5'];
    var joinedClasses: Array<string> = ['majd'];
    var resultComponenet;
    if (createdClasses.length == 0 && joinedClasses.length == 0) {
        resultComponenet = <EmptyClasses></EmptyClasses>;
    } else {
        resultComponenet = (
            <div className="flex w-full flex-col gap-2 p-3">
                <div className="flex w-full flex-1 flex-wrap gap-2">
                    <CreateClassContainer />
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
        </div>
    );
}
