import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input, Button } from "antd/lib";

export interface CustomInputProps {
  label: string;
  defaultValue?: string;
  control: any;
  name: string;
  rules: Record<string, any>;
  placeholder: string;
  type: string;
}

const CustomInput = ({
  label,
  defaultValue,
  type = "text",
  placeholder = "Enter Response",
  ...rest
}: CustomInputProps) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <Controller
        name={rest.name}
        defaultValue={defaultValue}
        control={rest.control}
        rules={rest.rules}
        render={({ field, fieldState }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className={
              fieldState.invalid ? "custom-input error" : "custom-input"
            }
          />
        )}
      />
    </div>
  );
};

export default CustomInput;