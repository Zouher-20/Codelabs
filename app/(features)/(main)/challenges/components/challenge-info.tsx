import IconRenderer from '@/app/components/globals/icon';
import { challengeInfo } from '@/app/constants/challenge-info';

interface Props {
    info: {
        type: string;
        difficulty: string;
        startIn: string;
        alreadyEnrolled: string;
    };
}
type mapType = {
    [key: string]: string;
};
const propertyMap: mapType = {
    '': 'type',
    'difficulty :': 'difficulty',
    'start in :': 'startIn',
    'already enrolled :': 'alreadyEnrolled'
};

const ChallengeInfo = ({ info }: Props) => {
    return (
        <div className="flex h-fit min-w-64 max-w-fit flex-col justify-center gap-4 rounded-2xl bg-base-300 p-8 max-sm:self-center">
            {challengeInfo.map((item, index) => (
                <section key={index} className="flex gap-3">
                    <IconRenderer
                        className={'self-center ' + item.color}
                        fontSize={24}
                        icon={item.icon}
                    />
                    <p>
                        {item.label +
                            ' ' +
                            (info as { [key: string]: string })[propertyMap[item.label]]}
                    </p>
                </section>
            ))}
        </div>
    );
};
export default ChallengeInfo;
