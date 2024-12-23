import React from "react";

import Toast from "components/toast/Toast";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Toast />
      {children}
    </div>
  );
};

export default Layout;
