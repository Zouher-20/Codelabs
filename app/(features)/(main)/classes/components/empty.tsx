import Button from '@/app/components/globals/form/button';
import empty from '@/public/images/classes/empty-class.svg';
export default function EmptyClasses() {
    return (
        <div className="flex w-full flex-col items-center gap-5">
            <img src={empty.src} className="m-auto w-1/3" />
            <p>Add class room to get started </p>
            <Button label="Create new class" color="any" onClick={() => {}} />
        </div>
    );
}
