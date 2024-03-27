import info from '@/public/images/classes/classes-info.svg';
import CodeLabContainer from './container';

export default function InfoContainer() {
    return (
        <CodeLabContainer height={'16rem'}>
            <div className="flex gap-2 p-5 max-md:flex-col">
                <img src={info.src} className="m-auto w-1/4 max-md:w-1/2" />
                <div className="flex flex-col justify-center gap-2">
                    <p className="text-md font-bold text-primary max-md:text-center">
                        what benefits you will gaine from using code lab classes
                    </p>
                    <p className="text-sm max-md:text-center">
                        using codelab classes will allow you to teach your student online without
                        needing to install the environment in each student pc and other feature that
                        allow you to track your student process and achievement and know who is
                        doing will and who is not we wish you a good experience using this feature
                    </p>
                </div>
            </div>
        </CodeLabContainer>
    );
}
