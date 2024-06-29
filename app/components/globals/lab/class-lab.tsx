import Lab from './lab';

const ClassLab = ({ footer }: { footer: JSX.Element }) => {
    return (
        <div className="flex h-fit cursor-pointer flex-col gap-2 rounded-xl bg-base-100 pb-2">
            {/* <InteractionsLab react={[754, 213, 30, 84]} /> */}
            <Lab />
            <div className="px-4 pb-1">{footer}</div>
        </div>
    );
};

export default ClassLab;
