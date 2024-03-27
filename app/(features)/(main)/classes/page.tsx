'use client';

import info from '@/public/images/classes/classes-info.svg';
import ClassesList from './components/class-list-container';
import CodeLabContainer from './components/container';
import CreateClassContainer from './components/create-button-container';
import EmptyClasses from './components/empty';

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
                <CodeLabContainer height={'16rem'}>
                    <div className="flex gap-2 p-5 max-md:flex-col">
                        <img src={info.src} className="m-auto w-1/4 max-md:w-1/2" />
                        <div className="flex flex-col justify-center gap-2">
                            <p className="text-md font-bold text-primary max-md:text-center">
                                what benefits you will gaine from using code lab classes
                            </p>
                            <p className="text-sm max-md:text-center">
                                using codelab classes will allow you to teach your student online
                                without needing to install the environment in each student pc and
                                other feature that allow you to track your student process and
                                achievement and know who is doing will and who is not we wish you a
                                good experience using this feature
                            </p>
                        </div>
                    </div>
                </CodeLabContainer>
            </div>
        );
    }
    return (
        <div className="flex min-h-[550px] flex-col items-center justify-center ">
            {resultComponenet}
        </div>
    );
}
