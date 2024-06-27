import IconRenderer from '../../icon';

type radio = {
    options: Array<{ label: string; name?: string; id: string; disabled?: boolean; icon: string }>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioOption = ({ options, onChange }: radio) => {
    return (
        <div className="flex flex-col gap-2 ">
            {options.map(({ label, id, name, icon, disabled }, index) => {
                return (
                    <div
                        key={index}
                        className="flex items-center  gap-2 rounded-xl bg-base-200 px-2 py-2"
                    >
                        {label == 'From scratch' ? (
                            <IconRenderer className="text-primary " fontSize={28} icon={icon} />
                        ) : icon == '' ? (
                            <></>
                        ) : (
                            <img
                                className="h-10  w-10 rounded-md object-cover"
                                src={`http://localhost:3000${icon?.replace(/\\/g, '/')}`}
                            />
                        )}
                        <label className="flex w-full cursor-pointer items-center justify-between gap-2 p-2 ">
                            <span className="label-text">{label}</span>
                            <input
                                type="radio"
                                name={name}
                                className="radio checked:bg-primary"
                                value={id}
                                disabled={disabled}
                                defaultChecked={index === 0}
                                onChange={e => onChange(e)}
                            />
                        </label>
                    </div>
                );
            })}
        </div>
    );
};
export default RadioOption;
