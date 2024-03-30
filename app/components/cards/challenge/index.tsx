import Image from "next/image";
import Button from "../../globals/form/button";
import defaultImage from '../../../../public/lab.png'

const Challenge = ({ image, name, description, onClick }: {
    image?: string,
    name: string,
    description: string,
    onClick?: () => void
}) => {
    return (
        <div className=" bg-base-100 flex flex-col gap-1 p-4 rounded-2xl h-full">
            <div className="h-full flex gap-8">
                <div className="justify-center min-w-52 bg-base-200 flex flex-col items-center rounded-xl">
                    <Image className="self-center" src={image ? image : defaultImage} alt="image" />
                </div>
                <div className="flex flex-col gap-2 slef-center w-full py-4">
                    <h1 className="text-xl font-bold">{name}</h1>
                    <p className="text-sm tracking-wide h-full">{description}</p>
                    <section className=""><Button label="enroll" style="any" onClick={onClick} /></section>
                </div>
            </div>
        </div>
    );
}

export default Challenge;