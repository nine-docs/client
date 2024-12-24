import React from "react";

import Toast from "components/toast/Toast";

import classes from "./Layout.module.scss";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Toast />
      <div className={classes.Layout}>{children}</div>
    </>
  );
};

export default Layout;
