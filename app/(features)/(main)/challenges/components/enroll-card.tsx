import IconRenderer from "@/app/components/globals/icon"

const EnrollCard = ({ title, tags }: { title: string, tags: Array<{ name: string, tagType: string }> }) => {
    return (
        <div className="relative p-24">
            <div className="flex flex-col flex-8 bg-base-300 p-8 gap-4 rounded-3xl  absolute -bottom-24 ml-12 mt-24 -right-24">
                <h2 className="text-primary"> YOUR CHALLENGE:</h2>
                <span className="text-2xl font-bold text-white flex -ml-12 gap-4">
                    <button className="rounded-full bg-primary p-1"><IconRenderer className="text-black" fontSize={24} icon="solar:arrow-left-linear" /></button>
                    create a Lab that includes a {title}</span>
                <button className="btn w-fit btn-primary">Start Here</button>
                <span> Make sure to tag your Lab
                    {tags.map((tag, index) => (
                        <>
                            <span className="text-warning"> {tag.name} </span>
                            {
                                tags[index + 1] == null
                                    ? <span> and </span> : <span> , </span>
                            }
                        </>
                    ))}
                    <span className="text-warning">Code-Labs-Challenge </span>
                    so that we can all see it!</span>
            </div>
        </div>
    )
}
export default EnrollCard