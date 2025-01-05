import React from "react";

import classes from "./SubscribeFormLayout.module.scss";

type SubscribeFormLayoutPropsType = {
  title: string;
  children: React.ReactNode;
};

const SubscribeFormLayout: React.FC<SubscribeFormLayoutPropsType> = ({
  title,
  children,
}) => {
  return (
    <form className={classes.form_wrap}>
      <h4 className={classes.form_title}>{title}</h4>
      {children}
    </form>
  );
};

export default SubscribeFormLayout;
