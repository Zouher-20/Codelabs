import IconRenderer from "../icon";
import Lab from "./lab";

const ClassLab = ({ name, type, icon }: { name: string, type: string, icon?: string }) => {
    return (
        <div className="bg-base-100 h-fit rounded-xl pb-2 flex flex-col gap-2">
            {/* <InteractionsLab react={[754, 213, 30, 84]} /> */}
            <Lab />
            <div className="px-4 py-2">
                <p className="text-lg">{name}</p>
                <section className="bg-base-100 flex gap-1 p-1 rounded-2xl min-w-[50px]">
                    <IconRenderer fontSize={24} icon={icon ? icon : "solar:bookmark-circle-broken"} />
                    <p className='self-start'>{type}</p>
                </section>
            </div>
        </div>
    );
}

export default ClassLab;