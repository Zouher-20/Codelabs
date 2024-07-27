import { Icon } from '@iconify/react/dist/iconify.js';

const DropDownItem = (item: dropDownItemValue) => {
    if (!(item.show ?? true)) return <></>;
    return (
        <div>
            {(item.withSpreator ?? true) && <span className="divider mx-8 my-0" />}
            <li onClick={item.onClick}>
                <div>
                    <Icon icon={item.icon} className={`size-6 ${item.color}`} />
                    {item.text}
                </div>
            </li>
        </div>
    );
};

const Dropdown = ({ items }: { items: Array<dropDownItemValue> }) => {
    return (
        <div className="dropdown dropdown-left">
            <div
                tabIndex={0}
                role="button"
                className="flex cursor-pointer items-center gap-2 rounded-btn hover:opacity-85"
            >
                <Icon icon="solar:menu-dots-bold-duotone" className="size-10 text-primary" />
            </div>

            <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow"
            >
                {items.map(e => {
                    return (
                        <DropDownItem
                            withSpreator={e.withSpreator}
                            text={e.text}
                            onClick={e.onClick}
                            color={e.color}
                            icon={e.icon}
                        />
                    );
                })}
            </ul>
        </div>
    );
};

export default Dropdown;

export interface dropDownItemValue {
    text: string;
    onClick: () => void;
    color: string;
    show?: boolean;
    icon: string;
    withSpreator?: boolean;
}
