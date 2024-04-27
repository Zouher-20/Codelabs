import { userType } from "@/app/@types/user";
import StatisticsComponent from "@/app/components/statistics/statistics-components";
import chart from '@/public/images/challenges/chart.png'
import Image from "next/image";

const Statistics = ({ user }: { user: userType }) => {
    const labsCapacity = () => {
        if (user.plan == 'basic') {
            return (5 - user.labs)
        } else if (user.plan == 'plus') {
            return (10 - user.labs)
        } else return 0
    }
    const classesCapacity = () => {
        if (user.plan == 'basic') {
            return (2 - user.classes)
        } else if (user.plan == 'plus') {
            return (5 - user.classes)
        } else return 0
    }
    return (
        <div className="flex flex-col w-full gap-4 p-4">
            <div className="flex flex-col sm:flex-row">
                <StatisticsComponent
                    cardLabel="Labs"
                    labels={['Labs', 'Labs capacity']}
                    series={[user.labs, labsCapacity()]}
                    colors={['#50FA7B', '#282C2B']}
                    width={220}
                    height={200}
                />
                <div className="self-center pt-20 px-16 max-md:hidden">
                    <div className="font-bold text-2xl h-24 leading-relaxed" style={{ transform: 'rotate(-5deg)' }}>
                        Looking to add more labs and classes? Upgrade your plan for greater flexibility!<br />
                        Check out our options to find the perfect plan for you!"
                        <button className="btn btn-primary  ml-2 ">Extend</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row">
                <StatisticsComponent
                    cardLabel="Classes"
                    labels={['Classes', 'Classes capacity']}
                    series={[user.classes, classesCapacity()]}
                    colors={['#E3E354', '#282C2B']}
                    width={220}
                    height={200}
                />
            </div>
        </div>
    );
}

export default Statistics;