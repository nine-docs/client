import React from "react";

import classes from "./BaseButton.module.scss";

type BaseButtonProps = {
  type: "button" | "submit";
  theme: "primary" | "primary-light" | "gray";
  children: React.ReactNode;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  type,
  theme = "primary",
  children,
}) => {
  return (
    <button
      className={`${classes.button_wrap} ${classes.button_primary}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default BaseButton;
