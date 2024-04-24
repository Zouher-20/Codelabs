import { textareaType } from '@/app/@types/textarea';

const Textarea = ({
    id,
    name,
    placeholder,
    errors,
    style,
    value,
    onChange,
    onBlur
}: textareaType) => {
    return (
        <div className="flex h-full flex-col gap-1">
            <textarea
                id={id}
                name={name}
                placeholder={placeholder ? placeholder : 'textarea'}
                className={
                    'textarea textarea-bordered textarea-sm max-w-sm ' +
                    style +
                    ' ' +
                    (errors ? ' textarea-error' : '')
                }
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            <p className="pb-2 pl-2 text-error">{errors}</p>
        </div>
    );
};
export default Textarea;
