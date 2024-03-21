export interface inputType {
    id?: string;
    name?: string;
    type: string;
    placeholder?: string;
    icon?: string;
    errors?: string | null;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
