export interface inputType {
    id?: string;
    name?: string;
    type: string;
    placeholder?: string;
    icon?: string;
    errors?: string | null;
    disabled?: boolean;
    value: string;
    onSubmit?: (e: React.SubmitEvent<HTMLInputElement>) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
