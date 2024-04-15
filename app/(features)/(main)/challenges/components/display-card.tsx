const DisplayCard = ({ name, items }: { name: string, items: Array<string> }) => {
    return (
        <div className="p-8 bg-base-100 rounded-3xl basis-1/2 flex flex-col gap-4">
            <h1 className="text-primary text-3xl font-bold -mt-12 ">{name}</h1>
            {items.map((item, index) => (
                <span className="flex gap-2 -ml-12 text-[.9rem]">
                    <p className="rounded-full bg-primary h-fit text-center px-3 py-2 text-black ">{index + 1}</p>
                    {item}</span>
            ))
            }
        </div>
    )
}
export default DisplayCard