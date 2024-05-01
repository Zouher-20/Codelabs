export interface buttonType {
    label?: string;
    style?: string;
    color?: string;
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: (() => void) | undefined;
}
