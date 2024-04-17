import IconRenderer from '../icon';
import Lab from './lab';

const ClassLab = ({ name, type, icon }: { name: string; type: string; icon?: string }) => {
    return (
        <div className="flex h-fit cursor-pointer flex-col gap-2 rounded-xl bg-base-100 pb-2">
            {/* <InteractionsLab react={[754, 213, 30, 84]} /> */}
            <Lab />
            <div className="px-4 pb-1">
                <p className="text-lg">{name}</p>
                <section className="flex min-w-[50px] gap-1  rounded-2xl bg-base-100">
                    <IconRenderer
                        fontSize={24}
                        icon={icon ? icon : 'solar:bookmark-circle-broken'}
                    />
                    <p className="self-start">{type}</p>
                </section>
            </div>
        </div>
    );
};

export default ClassLab;
