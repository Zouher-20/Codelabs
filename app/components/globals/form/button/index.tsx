import { buttonType } from "@/app/@types/button";

const Button = ({ label, style, onClick }: buttonType) => {
    const basic = ' bg-white text-black hover:bg-base-100 hover:text-white';
    const outlin = 'bg-base-300 text-white border-1 border-white hover:bg-white hover:text-black';
    const fill = 'bg-base-100';
    return (
        <button onClick={onClick}
            className={"btn min-w-24 "
                +
                (style == 'basic' ? basic : (style == 'fill' ? fill : (style == 'outline' ? outlin : 'bg-base-200 text-primary')))}
        >
            {label}
        </button >
    );
}

export default Button;