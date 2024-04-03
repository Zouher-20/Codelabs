export interface buttonType {
    label?: string;
    style?: string;
    color?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
}
