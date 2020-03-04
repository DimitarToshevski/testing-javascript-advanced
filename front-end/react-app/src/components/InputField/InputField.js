import React from "react";

import { InputWrapper, Label, Input } from "./InputFieldStyles";

const InputField = ({
  name,
  label,
  type = "text",
  value = "",
  onChange,
  ...props
}) => (
  <InputWrapper {...props}>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} type={type} value={value} onChange={onChange} />
  </InputWrapper>
);

export default InputField;
