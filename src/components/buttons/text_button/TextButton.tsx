import React from "react";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./TextButton.module.scss";

type TextButtonProps = {
  type?: "button" | "submit";
  theme?: "primary" | "primary-light" | "gray" | "none";
  text: string;
  size?: "small" | "normal" | "large" | "xlarge";
  onClick?: () => void;
};
const TextButton: React.FC<TextButtonProps> = ({
  type,
  theme,
  text,
  size = "normal",
  onClick,
}) => {
  return (
    <BaseButton type={type} theme={theme} onClick={onClick}>
      <span
        className={`${size === "small" && classes.small} ${size === "normal" && classes.normal} ${size === "large" && classes.large} ${size === "xlarge" && classes.xlarge}`}
      >
        {text}
      </span>
    </BaseButton>
  );
};

export default TextButton;
