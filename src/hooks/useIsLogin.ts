import dayjs from "dayjs";
import { useAuthStore } from "stores/authStore";

const useIsLogin = () => {
  const { token, accessTokenExpiredAt } = useAuthStore();

  const isLogin =
    token !== "" &&
    accessTokenExpiredAt !== "" &&
    !dayjs(accessTokenExpiredAt).isBefore(dayjs());

  return { isLogin };
};

export default useIsLogin;
