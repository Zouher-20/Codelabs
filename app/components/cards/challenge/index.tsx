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
        <div className=" bg-base-100 flex flex-col gap-1 p-4 rounded-2xl">
            <div className="flex gap-8">
                <div className="min-w-64  h-min pt-12 bg-base-200 flex flex-col items-center rounded-xl">
                    <Image className="h-28 mb-8 w-32" src={image ? image : defaultImage} alt="image" />
                </div>
                <div className="flex flex-col gap-2 slef-center w-full py-4">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p className=" tracking-wide h-full">{description}</p>
                    <section ><Button label="enroll" style="any" onClick={onClick} /></section>
                </div>
            </div>
        </div>
    );
}

export default Challenge;