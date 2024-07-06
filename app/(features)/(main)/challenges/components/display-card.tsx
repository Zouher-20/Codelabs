const DisplayCard = ({ name, resources }: { name: string; resources: string }) => {
    return (
        <div className="flex flex-col gap-4 rounded-3xl bg-base-100 p-8 lg:basis-1/2">
            <h1 className="-mt-12 text-3xl font-bold text-primary ">{name}</h1>
            <span dangerouslySetInnerHTML={{ __html: resources }}></span>
        </div>
    );
};
export default DisplayCard;
