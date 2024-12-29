import dayjs from "dayjs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "stores/authStore";

/* 로그인 되어있지 않거나, 토큰이 만료된 경우 강제로 메인화면으로 navigate시키는 hook */
const useAuthCheck = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const { token, accessTokenExpiredAt, deleteAuthInfo } = useAuthStore();

  const isBeforeNow = (dateString: string): boolean => {
    const inputDate = dayjs(dateString);
    const now = dayjs();

    return now.isBefore(inputDate);
  };

  useEffect(() => {
    /* 로그인 정보가 없는데 로그인한 유저만 이용가능한 경로에 있는 경우 */
    if (token === "" || !isBeforeNow(accessTokenExpiredAt)) {
      if (
        pathname !== "/main" &&
        pathname !== "/login" &&
        pathname !== "/signup"
      ) {
        deleteAuthInfo();
        navigate("/main");
      }
    }
  }, [pathname]);
};

export default useAuthCheck;
