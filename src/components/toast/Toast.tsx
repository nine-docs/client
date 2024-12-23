import React from "react";
import { ToastContainer, Zoom } from "react-toastify";

const Toast = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      transition={Zoom}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={true}
      pauseOnHover={false}
      theme="light"
    />
  );
};

export default Toast;
