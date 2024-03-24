import RadioOption from "./radio-option";

type radio = {
    options: Array<{ label: string, name?: string, disabled?: boolean, icon: string }>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButtonGroup = ({ options, onChange }: radio) => {
    return (
        <RadioOption options={options} onChange={onChange} />
    );
}
export default RadioButtonGroup;