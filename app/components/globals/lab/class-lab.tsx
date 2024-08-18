import Lab from './lab';

const ClassLab = ({ footer }: { footer: JSX.Element }) => {
    return (
        <div className="flex h-fit transform cursor-pointer flex-col gap-2 rounded-xl bg-base-100 pb-2 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
            {/* <InteractionsLab react={[754, 213, 30, 84]} /> */}
            <Lab />
            <div className="px-4 pb-1">{footer}</div>
        </div>
    );
};

export default ClassLab;
