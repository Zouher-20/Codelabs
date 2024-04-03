import { userType } from "@/app/@types/user";
import StatisticsComponent from "@/app/components/statistics/statistics-components";

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
        <div className="flex flex-col w-fit xl:flex xl:flex-row sm:grid sm:grid-cols-2 gap-4 max-xl:justify-center pt-4">
            <StatisticsComponent
                cardLabel="Labs"
                labels={['Labs', 'Labs capacity']}
                series={[user.labs, labsCapacity()]}
                colors={['#50FA7B', '#282C2B']}
                width={220}
                height={200}
            />
            <StatisticsComponent
                cardLabel="Classes"
                labels={['Classes', 'Classes capacity']}
                series={[user.classes, classesCapacity()]}
                colors={['#E3E354', '#282C2B']}
                width={220}
                height={200}
            />
        </div>
    );
}

export default Statistics;