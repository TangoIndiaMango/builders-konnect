import React from 'react';
import { Input, Tooltip, InputProps } from 'antd';

interface NumericInputProps extends Omit<InputProps, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

// const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

const NumericInput = (props: NumericInputProps) => {
  const { value = '', onChange, ...rest } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange?.(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange?.(valueTemp);
    rest.onBlur?.(e);
  };

  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? Number(value) : '-'}</span>
  ) : (
    'Input a number'
  );

  return (
    <Tooltip
      trigger={['focus']}
      title={title}
      placement="topLeft"
      className="numeric-input"
    >
      <Input
        {...rest}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
      />
    </Tooltip>
  );
};

export default NumericInput;