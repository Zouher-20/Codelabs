import { inputType } from '@/app/@types/input';
import IconRenderer from '../../icon';

const Input = ({ id, name, type, placeholder, icon, errors, value, onChange, onBlur }: inputType) => {
    return (
        <div className='flex flex-col gap-1'>
            <label className={"input input-bordered flex items-center gap-2 max-w-sm h-[35px] input-sm " + (errors ? 'input-error' : '')}>
                {icon
                    ? <IconRenderer className={'opacity-70 ' + (errors ? 'text-error' : '')} fontSize={16} icon={icon} />
                    : <></>
                }
                <input
                    type={type ? type : 'text'}
                    id={id}
                    name={name}
                    placeholder={placeholder ? placeholder : 'text Field'}
                    className='grow'
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </label>
            <p className='text-error pl-2 pb-2'>{errors}</p>
        </div>
    );
}
export default Input;