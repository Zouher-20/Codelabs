interface tagType {
    id: string;
    tagename: string;
}

const EnrollCard = ({ challenge }: { challenge: any }) => {
    return (
        <div className="lg:relative lg:p-24">
            <div className="flex-8 mt-8 flex flex-col gap-4 rounded-3xl bg-base-300 p-8 lg:absolute lg:-bottom-24 lg:-right-24 lg:ml-12 lg:mt-24">
                <h2 className="text-primary"> YOUR CHALLENGE:</h2>
                <span className="text-2xl font-bold text-white">
                    create a Lab that includes a {challenge.title}
                </span>
                <button className="btn btn-primary w-fit">Start Here</button>
                <span>
                    Make sure to tag your Lab
                    {challenge.tags && challenge.tags.map((tag: any, index: number) => (
                        <>
                            <span className="text-warning"> {tag.tagename} </span>
                            {challenge.tags[index + 1] == null ? <span> and </span> : <span> , </span>}
                        </>
                    ))}
                    <span className="text-warning">Code-Labs-Challenge </span>
                    so that we can all see it!
                </span>
            </div>
        </div>
    );
};
export default EnrollCard;
