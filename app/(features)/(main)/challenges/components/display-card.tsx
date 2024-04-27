const DisplayCard = ({ name, items }: { name: string, items?: string }) => {
    return (
        <div className="p-8 bg-base-100 rounded-3xl basis-1/2 flex flex-col gap-4">
            <h1 className="text-primary text-3xl font-bold -mt-12 ">{name}</h1>
            <span className="flex gap-2 ">
                {items}</span>
        </div>
    )
}
export default DisplayCard