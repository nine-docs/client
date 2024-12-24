import React from "react";

import classes from "./BaseButton.module.scss";

type BaseButtonProps = {
  type?: "button" | "submit";
  theme?: "primary" | "primary-light" | "gray" | "none";
  onClick?: () => void;
  children?: React.ReactNode;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  type = "button",
  theme = "primary",
  onClick = () => {},
  children,
}) => {
  return (
    <button
      className={`${classes.button_wrap} ${theme === "primary" ? classes.button_primary : undefined}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default BaseButton;
