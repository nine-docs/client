import { motion } from "framer-motion";
import React from "react";

import classes from "./BaseButton.module.scss";

type BaseButtonProps = {
  type?: "button" | "submit";
  theme?: "primary" | "primary-line" | "gray" | "gray-line" | "none";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  width?: 0 | "fit-content" | string;
  height?: "35";
  br?: "0" | "4" | "8" | "20";
  p?: "xl" | "l" | "n" | "s" | "xs" | "none";
  children?: React.ReactNode;
  title?: string;
  disabled?: boolean;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  type = "button",
  theme = "primary",
  width,
  height,
  onClick = () => {},
  br = "4",
  p = "n",
  children,
  title,
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        duration: 0.1,
      }}
      disabled={disabled}
      className={`${classes.button_wrap} 
     
        ${
          theme === "primary"
            ? classes.button_primary
            : theme === "gray"
              ? classes.button_gray
              : theme === "primary-line"
                ? classes.button_primary_line
                : theme === "gray-line"
                  ? classes.button_gray_line
                  : classes.button_none
        } 
        ${
          br === "4"
            ? classes.radius_4
            : br === "8"
              ? classes.radius_8
              : br === "20"
                ? classes.radius_20
                : undefined
        }
        ${
          p === "xl"
            ? classes.p_xl
            : p === "l"
              ? classes.p_l
              : p === "n"
                ? classes.p_n
                : p === "s"
                  ? classes.p_s
                  : p === "xs"
                    ? classes.p_xs
                    : p === "none"
                      ? classes.p_none
                      : undefined
        }
        ${height === "35" ? classes.h35 : undefined}
        `}
      type={type}
      onClick={onClick}
      title={title}
      style={{ width: width }}
    >
      {children}
    </motion.button>
  );
};

export default BaseButton;
