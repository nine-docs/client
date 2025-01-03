import React from "react";

import classes from "./Checkbox.module.scss";

type CheckboxProps = {
  ref?: React.LegacyRef<HTMLInputElement>;
  id: string;
  name: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  ref,
  id,
  name,
  checked,
  onChange = () => {},
  onBlur = () => {},
}) => {
  return (
    <div className={classes.checkbox_wrap}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      />
      <label
        htmlFor={id}
        className={`${classes.label} ${checked ? classes.isChecked : undefined}`}
      >
        <span
          className={`${classes.checkbox} ${checked ? classes.checkbox_checked : undefined}`}
        />
        <p>{name}</p>
      </label>
    </div>
  );
};

export default Checkbox;
