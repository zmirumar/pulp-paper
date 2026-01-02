import React from "react";
import { Select as AntdSelect } from "antd";
import type { Rule } from "rc-field-form/lib/interface";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { AntdSelectItemWrapper } from "./style";

export interface ISelectData {
  label: string;
  value: string | number;
  [key: string]: unknown;
}

export interface SelectProps {
  placeholder?: string;
  children?: React.ReactNode;
  defaultValue?: string | number | (string | number)[];
  style?: React.CSSProperties;
  onChange?: (value: string | number | (string | number)[], option: ISelectData | ISelectData[]) => void;
  size?: "large" | "middle" | "small";
  mode?: "multiple" | "tags";
  value?: number | string | string[];
  showSearch?: boolean;
  maxTagCount?: number | "responsive";
  allowClear?: boolean;
  loading?: boolean;
  optionLabelProp?: string;
  label?: string;
  name?: (string | number)[] | string | number;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  tagRender?: (props: CustomTagProps) => React.ReactElement;
  rules?: Rule[];
  initialValue?: string | string[] | number | number[];
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  noStyle?: boolean;
  disabled?: boolean;
  className?: string;
  formItemClassName?: string;
  variant?: "outlined" | "borderless" | "filled";
  labelInValue?: boolean;
  options?: ISelectData[];
  icon?: React.ReactNode;
  notFoundContent?: React.ReactNode;
}

const { Option } = AntdSelect;

export const SelectOption = Option;

export const Select = ({
  disabled,
  placeholder,
  className,
  children,
  onChange,
  defaultValue,
  style,
  size,
  value,
  mode,
  showSearch = false,
  maxTagCount,
  allowClear,
  loading,
  optionLabelProp,
  label,
  name,
  dropdownRender,
  tagRender,
  rules,
  initialValue,
  placement,
  noStyle,
  variant,
  labelInValue,
  formItemClassName,
  options = [],
  icon,
  notFoundContent,
}: SelectProps) => {
  return (
    <AntdSelectItemWrapper
      label={label}
      name={name}
      initialValue={initialValue}
      noStyle={noStyle}
      rules={rules}
      className={formItemClassName}
    >
      <AntdSelect
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
        onChange={onChange}
        defaultValue={defaultValue}
        style={style}
        size={size}
        value={value}
        mode={mode}
        showSearch={showSearch}
        maxTagCount={maxTagCount}
        options={options}
        suffixIcon={icon}
        allowClear={allowClear}
        notFoundContent={notFoundContent}
        filterOption={(input: string, option?: ISelectData | unknown): boolean => {
          if (mode === "multiple") {
            return true;
          }

          if (!option) {
            return false;
          }

          if (React.isValidElement(option)) {
            const children = (option.props as { children?: unknown }).children;
            if (Array.isArray(children) && children[1]) {
              return String(children[1]).toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }
          }

          const typedOption = option as ISelectData;
          if (typedOption.label) {
            return String(typedOption.label).toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }

          if (typedOption.value) {
            return String(typedOption.value).toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }

          return false;
        }}
        loading={loading}
        optionLabelProp={optionLabelProp}
        dropdownRender={dropdownRender}
        tagRender={tagRender}
        placement={placement}
        variant={variant}
        labelInValue={labelInValue}
      >
        {children}
      </AntdSelect>
    </AntdSelectItemWrapper>
  );
};