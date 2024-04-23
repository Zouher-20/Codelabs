import Input from "@/app/components/globals/form/input";
import IconRenderer from "@/app/components/globals/icon";
import Link from "next/link";

const Challenges = () => {

    let heading = ["", "Challenge", "Duration", "Members", "Type", "Difficulty"];
    let body = [
        ["Kapil", "Jaipur", "MCA", 'MCA', 'MCA'],
        ["Aakash", "Hisar", "Btech", 'MCA', 'MCA'],
        ["Mani", "Ranchi", "MSc", 'MCA', 'MCA'],
        ["Yash", "Udaipur", "Mtech", 'MCA', 'MCA'],
    ];

    return <div className="p-6 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-white">Challenges</h1>
        <div className="flex gap-8">
            <span>
                <Input
                    id="search"
                    type="text"
                    placeholder="Search for challenge ..."
                    icon="circum:search"
                    defaultValue={""}
                />
            </span>
            <div className="dropdown">
                <summary tabIndex={0} className=" flex min-h-[35px] h-[35px] btn">Difficulty
                    <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                </summary>
                <ul tabIndex={0} className="mt-2 ml-4 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Hard</a></li>
                    <li><a>easy</a></li>
                </ul>
            </div>
            <div className="dropdown mr-auto">
                <div tabIndex={0} className="flex min-h-[35px] h-[35px] btn">Type
                    <IconRenderer width={24} height={24} icon={'solar:alt-arrow-down-linear'} />
                </div>
                <ul tabIndex={0} className="mt-2 ml-4 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <li><a>Vue js</a></li>
                    <li><a>React js</a></li>
                    <li><a>Angular</a></li>
                    <li><a>Skratch</a></li>
                </ul>
            </div>
            <Link href={'/admin/challenges/add-challenge'} className="btn h-[35px] min-h-[35px] btn-outline">Challenges
                <IconRenderer width={24} height={24} icon={'heroicons-solid:plus-sm'} />
            </Link>
        </div>
        <div className="p-4">
            <table className="w-full">
                <thead>
                    <tr className="grid grid-cols-7 w-full">
                        {heading.map((head, headID) => (
                            <th className="text-lg text-start" key={headID}>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="flex flex-col gap-2">
                    {body.map((rowContent, rowID) => (
                        <tr key={rowID} className="grid grid-cols-7 rounded-2xl px-2 py-1 bg-base-100">
                            <td ><IconRenderer className="text-primary" icon={'solar:medal-star-line-duotone'} width={52} height={52} /></td>
                            {rowContent.map((val, rowID) => (
                                <td className="self-center text-sm" key={rowID}>{val}</td>
                            ))}
                            <td>
                                <button className="btn h-[35px]">review</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default Challenges;