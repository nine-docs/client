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

const useProfile = () => {
  const token = useAuthStore((state) => state.token);

  const fallback: UseProfileResType = {
    success: true,
    errorCode: null,
    data: {
      nickname: "",
      email: "",
    },
  };

  const { data = fallback, isLoading } = useQuery({
    enabled: !!token,
    queryKey: queryKeyFactory.profile({ token: token }).queryKey,
    queryFn: (): Promise<UseProfileResType> => {
      return httpClient.get(`/api/v1/my-page/profile`);
    },
  });

  return { data, isLoading };
};

export default useProfile;
