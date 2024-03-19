
const Textarea = ({ id, name, placeholder, errors, value, onChange, onBlur }: {
    id?: string
    name?: string,
    placeholder?: string,
    errors?: string | null
    value: string,
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}) => {
    return (
        <div className='flex flex-col gap-1'>
            <textarea
                id={id}
                name={name}
                placeholder={placeholder ? placeholder : 'textarea'}
                className={'textarea textarea-bordered textarea-sm max-w-sm ' + (errors ? 'textarea-error' : '')}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            <p className='text-error pl-2 pb-2'>{errors}</p>
        </div>
    );
}
export default Textarea;