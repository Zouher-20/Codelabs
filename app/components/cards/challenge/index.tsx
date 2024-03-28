import Image from "next/image";
import defaultImage from '../../../../public/lab.png'
import Link from "next/link";
import { Route } from "next/types";

const Challenge = ({ image, name, description, id }: {
    image?: string,
    name: string,
    description: string,
    id: number
}) => {
    return (
        <div className=" bg-base-300 flex flex-col gap-1 p-4 rounded-2xl h-full">
            <div className="h-full flex gap-8">
                <div className="justify-center min-w-52 bg-base-200 flex flex-col items-center rounded-xl">
                    <Image className="self-center" src={image ? image : defaultImage} alt="image" />
                </div>
                <div className="flex flex-col gap-2 slef-center w-full py-4">
                    <h1 className="text-xl font-bold">{name}</h1>
                    <p className="text-sm tracking-wide h-full">{description}</p>
                    <section><Link className="btn min-w-24 bg-base-200 text-primary" href={('/challenges/' + `${id}`) as Route} >enroll</Link></section>
                </div>
            </div>
        </div>
    );
}

export default Challenge;