import { CSSProperties } from "react";
import { useFormContext } from "react-hook-form";

import classes from "./BaseTextarea.module.scss";

const BaseTextarea = ({
  placeholder = "",
  registerName,
  registerOption,
  maxLength = 100,
  style,
}: {
  placeholder?: string;
  registerName: string;
  registerOption?: object;
  maxLength?: number;
  style?: CSSProperties;
}) => {
  const methods = useFormContext();

  return (
    <textarea
      className={classes.textarea}
      placeholder={placeholder}
      maxLength={maxLength}
      {...methods.register(registerName, { ...registerOption })}
      style={style}
    />
  );
};

export default BaseTextarea;
