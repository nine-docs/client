import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

import useIsLogin from "hooks/useIsLogin";

type GetIsBookmarkResType = {
  success: boolean;
  errorCode?: string;
  data: null | {
    bookmarkId: number;
  };
};

const useGetIsBookmark = (articleId: number) => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";
  const { isLogin } = useIsLogin();

  const mockData: GetIsBookmarkResType = {
    success: true,
    errorCode: "0",
    data: null,
  };

  const fallback = {
    success: true,
    errorCode: "0",
    data: null,
  };

  const { data = fallback } = useQuery({
    enabled: isLogin,
    queryKey: queryKeyFactory.isBookmark({ articleId: articleId }).queryKey,
    queryFn: (): Promise<GetIsBookmarkResType> => {
      if (isApiMock) {
        return new Promise((resolve) => setTimeout(() => resolve(mockData)));
      } else {
        return httpClient.get(`/api/v1/article/${articleId}/bookmark`);
      }
    },
  });

  return { data };
};

export default useGetIsBookmark;
