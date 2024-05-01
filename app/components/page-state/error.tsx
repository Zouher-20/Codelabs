import Button from '../globals/form/button';

export function ErrorState({ text, callback }: { text: string | undefined; callback: () => void }) {
    return (
        <div className="flex w-full justify-end">
            <p className="text-red-500">{text ?? 'Erorr While Loading Data'}</p>
            <Button label="Reload" color="error" onClick={callback} style="w-30" />
        </div>
    );
}
