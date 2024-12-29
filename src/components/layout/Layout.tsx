import React from "react";

import MainHeader from "components/headers/main_header/MainHeader";
import Toast from "components/toast/Toast";

import classes from "./Layout.module.scss";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Toast />
      <div className={classes.layout}>
        <MainHeader />
        {children}
      </div>
    </>
  );
};

export default Layout;
