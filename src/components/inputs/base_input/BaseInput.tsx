import React from "react";
import { useFormContext } from "react-hook-form";

import classes from "./BaseInput.module.scss";

type BaseInputProps = {
  type: "text" | "number" | "";
  placeholder: string;
  disabled?: boolean;
  width?: "fit-content" | 0 | string;
  align: "center" | "start" | "end";
  registerName: string;
  registerOption: object;
  maxLength?: number;
};

const BaseInput: React.FC<BaseInputProps> = ({
  type = "text",
  placeholder = "",
  disabled = false,
  width = "fit-content",
  align = "start",
  registerName,
  registerOption,
  maxLength = 100,
}) => {
  const methods = useFormContext();

  return (
    <input
      type={type}
      placeholder={placeholder}
      width="100%"
      className={classes.input}
      {...methods.register(registerName, { ...registerOption })}
    />
  );
};

export default BaseInput;
