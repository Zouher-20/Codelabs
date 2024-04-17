import Button from '@/app/components/globals/form/button';
import defaultImage from '@/public/lab.svg';
import Image from 'next/image';

export default function CloneLabComponent({
    onButtonClick,
    buttonText
}: {
    onButtonClick: () => void;
    buttonText: string;
}) {
    return (
        <div className=" w-1/3 max-md:w-full">
            <div className="flex h-72 flex-col items-center justify-around rounded-md bg-base-200">
                <Image className="w-56" src={defaultImage} alt="Picture of the author" />
                <Button label={buttonText} color="fill" onClick={onButtonClick} />
            </div>
        </div>
    );
}
