    import React from "react";
import { Form, Checkbox as AntdCheckbox } from "antd";
import type { Rule } from "rc-field-form/lib/interface";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

export interface CheckboxProps {
  onChange?: ((e: CheckboxChangeEvent) => void) | undefined;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  label?: string;
  name?: (string | number)[] | string | number;
  className?: string;
  rules?: Rule[];
  noStyle?: boolean;
  initialValue?: boolean;
  disabled?: boolean;
  checked?: boolean | undefined;
  valuePropName?: string;
}

export const Checkbox = ({
  disabled = false,
  label,
  name,
  onChange,
  rules,
  className,
  noStyle,
  initialValue,
  checked,
  valuePropName,
}: CheckboxProps) => {
  return (
    <Form.Item
      name={name}
      rules={rules}
      className={className}
      noStyle={noStyle}
      initialValue={initialValue}
      valuePropName={valuePropName}
    >
      <AntdCheckbox disabled={disabled} onChange={onChange} checked={checked}>
        {label}
      </AntdCheckbox>
    </Form.Item>
  );
};
