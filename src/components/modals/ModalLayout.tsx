import React from "react";

type ModalLayoutProps = {
  children: React.ReactNode;
};

const ModalLayout: React.FC<ModalLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ModalLayout;
