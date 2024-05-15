import IconRenderer from "@/app/components/globals/icon"
import { TAGTYPE } from "@prisma/client";

interface tagType {
    id: string;
    tagename: string;
    tagtype: TAGTYPE | null;
}

const EnrollCard = ({ title, tags }: { title: string, tags: Array<tagType> }) => {
    return (
        <div className="lg:relative lg:p-24">
            <div className="flex flex-col flex-8 bg-base-300 gap-4 rounded-3xl lg:absolute lg:-bottom-24 lg:-right-24 mt-8 lg:mt-24 lg:ml-12 p-8">
                <h2 className="text-primary"> YOUR CHALLENGE:</h2>
                <span className="text-2xl font-bold text-white flex lg:-ml-12 gap-4">
                    <button className="hidden xl:block rounded-full bg-primary p-1"><IconRenderer className="text-black" fontSize={24} icon="solar:arrow-left-linear" /></button>
                    create a Lab that includes a {title}</span>
                <button className="btn w-fit btn-primary">Start Here</button>
                <span> Make sure to tag your Lab
                    {tags.map((tag, index) => (
                        <>
                            <span className="text-warning"> {tag.tagename} </span>
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