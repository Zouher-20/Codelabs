import Button from "../../globals/form/button";
import Lab from "../../globals/lab/lab";

const Challenge = ({ name, description, onClick }: {
    name: string,
    description: string,
    onClick?: () => void
}) => {
    return (
        <div className="w-3/4 bg-base-100 flex flex-col gap-1 p-4 rounded-2xl">
            <div className="flex gap-8">
                <Lab />
                <div className="flex flex-col gap-4 slef-center w-full">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p className=" tracking-wide h-full">{description}</p>
                    <section className="self-end"><Button label="enroll" style="any" onClick={onClick} /></section>
                </div>
            </div>
        </div>
    );
}

export default Challenge;