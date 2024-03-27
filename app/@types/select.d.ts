export type OptionsType<OptionType> = OptionType[];
export type ValueType<OptionType> = OptionType | OptionsType<OptionType> | null | undefined;
export type GroupedOptionsType<UnionOptionType> = Array<GroupType<UnionOptionType>>;
export interface GroupType<OptionType> {
    options: OptionsType<OptionType>;
    [key: string]: any;
}
export type MyOptionType = {
    label: string;
    value: string;
};
import { FieldProps } from 'formik';

export interface CustomSelectProps extends FieldProps {
    options: OptionsType<MyOptionType>;
    isMulti?: boolean;
    placeholder?: string;
    errors: string | null;
}
