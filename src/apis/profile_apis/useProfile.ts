import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "stores/authStore";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

type UseProfileResType = {
  success: boolean;
  errorCode: string | null;
  data: {
    nickname: string;
    email: string;
  };
};

const userProfileResMockData = {
  success: true,
  errorCode: null,
  data: {
    nickname: "홍길동",
    email: "helim01033@naver.com",
  },
};

const useProfile = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const token = useAuthStore((state) => state.token);

  const fallback: UseProfileResType = {
    success: true,
    errorCode: null,
    data: {
      nickname: "",
      email: "",
    },
  };

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery({
    enabled: !!token,
    queryKey: queryKeyFactory.profile({ token: token }).queryKey,
    queryFn: (): Promise<UseProfileResType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(userProfileResMockData), 100),
        );
      } else {
        return httpClient.get(`/api/v1/my-page/profile`);
      }
    },
  });

  return { data, isLoading, isError };
};

export default useProfile;
