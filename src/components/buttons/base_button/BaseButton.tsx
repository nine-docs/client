import React from "react";

import classes from "./BaseButton.module.scss";

type BaseButtonProps = {
  type: "button" | "submit";
  children: React.ReactNode;
};

const BaseButton: React.FC<BaseButtonProps> = ({ type, children }) => {
  return (
    <button className={classes.button_primary} type={type}>
      {children}
    </button>
  );
};

export default BaseButton;
