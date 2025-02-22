import dayjs from "dayjs";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "stores/authStore";

/* 
1. 토큰이나 토큰 만료일시 정보가 없는 경우
- 메인페이지 로그인, 회원가입 페이지에 있는 경우 그냥 두면 됨
- 나머지 페이지에 들어가면 '/'으로 navigate되어야 한다. 

2. 토큰이 있으나 만료 기간이 지나서 유효하지 않은 경우
 - deleteAuthStore 실행
 - 로그인, 회원가입, 메인 페이지에 있는 경우 그냥 두면 됨
 - 나머지 페이지에 들어가면 '/'으로 navigate되어야 한다.

3. 토큰이 유효한 경우
 - 로그인 페이지, 회원가입 페이지, 메인 페이지에 들어온 경우 /mypage/subscribe로 보낸다. 
 - 그 외의 경우는 그냥 두면 됨
*/
const useCheckAuth = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const { token, accessTokenExpiredAt, deleteAuthInfo } = useAuthStore();

  useEffect(() => {
    if (token === "" && accessTokenExpiredAt === "") {
      /* 1. 토큰이 없거나 만료날짜가 없음 */
      // 현재 페이지가 로그인, 회원가입, 메인화면, 문제페이지가 아니면 메인화면으로 강제소환
      if (
        pathname !== "/login" &&
        pathname !== "/signup" &&
        !pathname.includes("article") &&
        pathname !== "/"
      ) {
        navigate("/");
      }
    } else if (dayjs(accessTokenExpiredAt).isBefore(dayjs())) {
      /* 2. 토큰 만료 날짜가 지났음 */
      deleteAuthInfo();
      if (
        pathname !== "/login" &&
        pathname !== "/signup" &&
        pathname !== "/" &&
        !pathname.includes("article")
      ) {
        navigate("/");
      }
    } else {
      if (pathname === "/login" || pathname === "/signup" || pathname === "/") {
        navigate("/mypage/subscribe");
      }
    }
  }, [pathname, token, accessTokenExpiredAt, navigate, deleteAuthInfo]);
};

export default useCheckAuth;
