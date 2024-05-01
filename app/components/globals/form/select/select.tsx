'use client';
import * as type from '@/app/@types/select';
import { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import makeAnimated from 'react-select/animated';
import IconRenderer from '../../icon';

const SelectField = ({
    placeholder,
    field,
    form,
    options,
    isMulti,
    errors
}: type.CustomSelectProps) => {
    const animatedComponents = makeAnimated();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const onChange = (option: type.ValueType<type.MyOptionType | type.MyOptionType[]>) => {
        form.setFieldValue(field.name, (
            isMulti ? (option as type.MyOptionType[]).map((item: type.MyOptionType) => item.value)
                : (option as type.MyOptionType).value))
    };

    const getValue = () => {
        if (isMulti) {
            if (options) return options.filter((option: any) => field.value.indexOf(option.value) >= 0);
            else return [];
        }
        else return options.filter((option: any) => field.value.indexOf(option.value) >= 0)
        // else return { value: field.value, label: field.value };
    };

    return isMounted ? (
        <div className="flex flex-col gap-1 ">
            <label
                className={
                    'input input-bordered flex h-fit max-w-sm items-center gap-2  pr-0 ' +
                    (errors ? ' input-error' : '')
                }
            >
                <IconRenderer
                    className={'opacity-70 ' + (errors ? 'text-error' : '')}
                    fontSize={16}
                    icon="solar:bookmark-circle-broken"
                />
                <Select
                    components={animatedComponents}
                    closeMenuOnSelect={false}
                    styles={selectStyle(errors)}
                    name={field.name}
                    className="grow"
                    value={getValue()}
                    onChange={onChange}
                    placeholder={placeholder}
                    options={options}
                    isMulti={isMulti}
                />
            </label>
            <p className="pb-2 pl-2 text-error">{errors}</p>
        </div>
    ) : null;
};
const selectStyle = (errors: string | null) => {
    const style: StylesConfig = {
        control: baseStyles => ({
            ...baseStyles,
            borderRadius: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            height: 'fit-content',
            paddingLeft: ' 0.75rem',
            paddingRight: ' 0.75rem',
            fontSize: '0.875rem',
            lineHeight: ' 1rem',
            minHeight: '34px',
            width: '100%',
            color: '#282C2B',
            border: 'none',
            borderColor: 'none',
            backgroundColor: '#282C2B',
            boxShadow: '',
            ':hover': {
                borderColor: errors ? '#FF5861' : '#50FA7B'
                // boxShadow: (errors ? '0 0 0 1px #FF5861' : '0 0 0 1px #50FA7B'),
            }
        }),
        menu: baseStyles => ({
            ...baseStyles,
            color: 'white',
            borderColor: '#50FA7B',
            backgroundColor: '#282C2B'
        }),
        singleValue: baseStyles => ({
            ...baseStyles,
            color: 'white',
        }),
        multiValue: baseStyles => ({
            ...baseStyles,
            color: '#50FA7B',
            backgroundColor: '#171818'
        }),
        multiValueLabel: baseStyles => ({
            ...baseStyles,
            color: 'white'
        }),
        multiValueRemove: baseStyles => ({
            ...baseStyles,
            ':hover': {
                backgroundColor: '#50FA7B',
                color: '#1D231C'
            }
        }),
        dropdownIndicator: baseStyles => ({
            ...baseStyles,
            color: errors ? '#FF5861' : '#50FA7B'
        }),
        clearIndicator: baseStyles => ({
            ...baseStyles,
            color: '#50FA7B'
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isDisabled
                ? undefined
                : state.isSelected
                    ? '#1D231C'
                    : state.isFocused
                        ? '#1D231C'
                        : undefined,
            ':active': {
                ...baseStyles[':active'],
                backgroundColor: !state.isDisabled
                    ? state.isSelected
                        ? '#1D231C'
                        : '#1D231C'
                    : undefined
            }
        }),
        noOptionsMessage: baseStyles => ({
            ...baseStyles,
            color: '#50FA7B'
        })
    };
    return style;
};
export default SelectField;
