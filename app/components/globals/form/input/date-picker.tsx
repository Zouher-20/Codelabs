import DatePicker from 'react-datepicker';
import IconRenderer from '../../icon';
export interface dateFieldType {
    placeholder?: string;
    icon?: string;
    errors?: string | null;
    date: Date;
    onChange(date: Date): void;
}

const CodeLabDatePicker = ({ icon, errors, date, onChange }: dateFieldType) => {
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
                <DatePicker
                    className="w-full bg-transparent "
                    selected={date}
                    onChange={date => onChange(date ?? new Date())}
                />
            </label>
            <p className="pb-2 pl-2 text-error">{errors}</p>
        </div>
    );
};
export default CodeLabDatePicker;
