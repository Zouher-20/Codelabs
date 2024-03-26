'use client';

import HomeButtons from './components/home-buttons';
import LabListComponent, { LabModel } from './components/lab-list-component';

export default function DiscoverPage() {
    var labs: Array<LabModel> = [
        { title: 'A new code Lab Sidebar' },
        { title: 'a unique appbar' },
        { title: 'button' },
        { title: 'text' },
        { title: 'new font style' },
        { title: 'new font style2' },
        { title: 'new font style3' }
    ];
    return (
        <div className="px-3 py-5">
            <div className="flex justify-between gap-5 max-md:flex-col">
                <HomeButtons
                    onButtonClick={() => {}}
                    color="primary"
                    title="Create new lab"
                    icon="solar:test-tube-minimalistic-bold-duotone"
                    subTitle="Start from scratch. Put some love ❤️ and build something great ✨ ."
                ></HomeButtons>
                <HomeButtons
                    onButtonClick={() => {}}
                    color="secondary"
                    title="Clone a lab"
                    icon="solar:lightbulb-bold-duotone"
                    subTitle="Add your touch 👌 . Create a new masterpiece from another one 🔥."
                ></HomeButtons>
            </div>
            <div className="h-3"></div>
            <LabListComponent labs={labs} title="Recently worked on"></LabListComponent>
            <div className="h-3"></div>
            <LabListComponent labs={labs} title="Trending"></LabListComponent>
        </div>
    );
}
