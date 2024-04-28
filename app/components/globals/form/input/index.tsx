import { inputType } from '@/app/@types/input';
import IconRenderer from '../../icon';

const Input = ({
    id,
    name,
    type,
    placeholder,
    icon,
    errors,
    value,
    defaultValue,
    disabled,
    onSubmit,
    onChange,
    onBlur
}: inputType) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <label
                className={
                    'input input-sm input-bordered flex h-[35px] max-w-sm items-center gap-2 ' +
                    (errors ? 'input-error' : '')
                }
            >
                {icon ? (
                    <IconRenderer
                        className={'opacity-70 ' + (errors ? 'text-error' : '')}
                        fontSize={16}
                        icon={icon}
                    />
                ) : (
                    <></>
                )}
                <input
                    type={type ? type : 'text'}
                    id={id}
                    name={name}
                    placeholder={placeholder ? placeholder : 'text Field'}
                    className="grow"
                    disabled={disabled}
                    value={value}
                    defaultValue={defaultValue}
                    onSubmit={onSubmit}
                    onChange={e => {
                        if (onChange != null) onChange(e.target.value);
                    }}
                    onBlur={onBlur}
                />
            </label>
            <p className="pb-2 pl-2 text-error">{errors}</p>
        </div>
    );
};
export default Input;
