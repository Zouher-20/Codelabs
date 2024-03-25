import IconRenderer from "../../icon";

type radio = {
    options: Array<{ label: string, name?: string, disabled?: boolean, icon: string }>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioOption = ({ options, onChange }: radio) => {
    return (
        <div className="flex flex-col gap-2 ">
            {options.map(({ label, name, icon, disabled }, index) => {
                return (
                    <div key={index} className="flex gap-2  items-center bg-base-200 px-2 py-2 rounded-xl">
                        <IconRenderer className='text-primary ' fontSize={28} icon={icon} />
                        <label className="flex items-center gap-2 justify-between w-full p-2 cursor-pointer ">
                            <span className="label-text">{label}</span>
                            <input
                                type="radio"
                                name={name}
                                className="radio checked:bg-primary"
                                value={label}
                                disabled={disabled}
                                defaultChecked={index === 0}
                                onChange={(e) => onChange(e)} />
                        </label>
                    </div>
                );
            })
            }
        </div>
    );
}
export default RadioOption;