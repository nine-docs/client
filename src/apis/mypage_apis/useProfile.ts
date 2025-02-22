import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "stores/authStore";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const useProfile = () => {
  const token = useAuthStore((state) => state.token);

  const fallback = {
    success: true,
    errorCode: null,
    data: {
      nickname: "",
      email: "",
    },
  };

  const { data = fallback } = useQuery({
    enabled: !!token,
    queryKey: queryKeyFactory.profile({ token: token }).queryKey,
    queryFn: () => {
      return httpClient.get(`/api/v1/my-page/profile`);
    },
  });

  return data;
};

export default useProfile;
