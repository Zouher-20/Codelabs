import IconRenderer from '../../icon';
import { useState } from 'react';

const useInput = ({ icon, name, placeholder, type }: {
    icon?: string,
    placeholder?: string,
    name?: string,
    type: string,
}) => {
    const [value, setValue] = useState("");
    const input =
        <label className="input input-bordered flex items-center gap-2 max-w-sm h-[35px] input-sm">
            {icon
                ? <IconRenderer className='opacity-70' fontSize={16} icon={icon} />
                : <></>
            }
            <input
                type={type ? type : 'text'}
                name={name}
                placeholder={placeholder ? placeholder : 'text Field'}
                className="grow"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
        </label>
    return [value, input];
}
export default useInput;

// const Input = ({ icon, name, placeholder, type, value, onChange }: {
//     icon?: string,
//     placeholder?: string,
//     name?: string,
//     type: string,
//     value: string,
//     onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) => {
//     return (
//         <label className="input input-bordered flex items-center gap-2 max-w-sm h-[35px] input-sm">
//             {icon
//                 ? <IconRenderer className='opacity-70' fontSize={16} icon={icon} />
//                 : <></>
//             }
//             <input
//                 type={type ? type : 'text'}
//                 name={name}
//                 placeholder={placeholder ? placeholder : 'text Field'}
//                 className="grow"
//                 value={value}
//                 onChange={onChange}
//             />
//         </label>
//     );
// }

