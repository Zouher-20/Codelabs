import IconRenderer from "@/app/components/globals/icon";

interface Props {
    items: {
        icon: string;
        label: string;
        color: string;
    }[]
}
const ChallengeInfo = ({ items }: Props) => {
    return (
        <div className='justify-center p-8 bg-base-100 flex flex-col gap-4 h-full rounded-2xl'>
            {items.map((item, index) => (
                <section key={index} className='flex gap-3'>
                    <IconRenderer className={'self-center ' + item.color} fontSize={24} icon={item.icon} />
                    <p>{item.label}</p>
                </section>
            ))}
        </div>
    )
}
export default ChallengeInfo;