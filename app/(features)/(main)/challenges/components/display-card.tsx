const DisplayCard = ({ name, resources }: { name: string, resources: string }) => {
    return (
        <div className="p-8 bg-base-100 rounded-3xl lg:basis-1/2 flex flex-col gap-4">
            <h1 className="text-primary text-3xl font-bold -mt-12 ">{name}</h1>
            <span className="flex gap-2 " dangerouslySetInnerHTML={{ __html: resources }}></span>
        </div>
    )
}
export default DisplayCard