import React from "react";

import { Btn } from "./ButtonStyles";

const Button = ({
  text,
  onClick,
  type = "default",
  isDisabled = false,
  ...props
}) => (
  <Btn {...props} type={type} onClick={onClick} disabled={isDisabled}>
    {text}
  </Btn>
);

export default Button;
