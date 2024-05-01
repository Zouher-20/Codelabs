import { buttonType } from '@/app/@types/button';

const Button = ({ label, style, color, type, disabled, onClick, loading }: buttonType) => {
    const basic = ' bg-white text-black hover:bg-base-100 hover:text-white';
    const outlin = 'bg-base-300 text-white border-1 border-white hover:bg-white hover:text-black';
    const fill = 'bg-base-100';
    const error = 'bg-red-600 opacity-70 text-white hover:opacity-100 hover:bg-red-600';
    return loading ? (
        <span className="loading loading-spinner loading-lg"></span>
    ) : (
        <button
            type={type}
            disabled={disabled ? true : false}
            onClick={onClick}
            className={
                'btn min-w-24 ' +
                style +
                ' ' +
                (color == 'basic'
                    ? basic
                    : color == 'fill'
                      ? fill
                      : color == 'outline'
                        ? outlin
                        : color == 'error'
                          ? error
                          : 'bg-base-200 text-primary')
            }
        >
            {label}
        </button>
    );
};

export default Button;
