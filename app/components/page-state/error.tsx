'use client';
import Button from '../globals/form/button';

export function ErrorState({ text, callback }: { text: string | undefined; callback: () => void }) {
    return (
        <div className="flex w-full flex-col items-center">
            <p className="text-red-500">{text ?? 'Erorr While Loading Data'}</p>
            <div className="h-10"></div>
            <Button label="Reload" color="error" onClick={callback} style="w-32" />
        </div>
    );
}
