import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "stores/authStore";

import MainHeader from "components/headers/main_header/MainHeader";
import Toast from "components/toast/Toast";

import classes from "./Layout.module.scss";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const { token, accessTokenExpiredAt, deleteAuthInfo } = useAuthStore();

  const isBeforeNow = (dateString: string): boolean => {
    const inputDate = dayjs(dateString);
    const now = dayjs();

    return now.isBefore(inputDate);
  };

  useEffect(() => {
    if (token !== "" && isBeforeNow(accessTokenExpiredAt)) {
      navigate("/mypage/subscribe");
    } else if (token !== "" && !isBeforeNow(accessTokenExpiredAt)) {
      deleteAuthInfo();
    }
  }, [token, accessTokenExpiredAt]);

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
