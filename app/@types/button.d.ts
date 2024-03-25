export interface buttonType {
    label?: string;
    style?: string;
    color?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
}
