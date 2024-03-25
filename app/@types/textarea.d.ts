export interface textareaType {
    id?: string;
    name?: string;
    placeholder?: string;
    errors?: string | null;
    value: string;
    style?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}
