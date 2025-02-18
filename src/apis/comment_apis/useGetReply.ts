import { useInfiniteQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const LIMIT = 5;

type GetReplyResType = {
  success: boolean;
  errorCode?: string;
  data: {
    cursor: null | number;
    items: ReplyItemType[];
  };
};

const useGetReply = (articleId: number, commentId: number) => {
  const initialUrl: string = `/api/v1/article/${articleId}/comment/${commentId}/replies?limit=${LIMIT}`;

  return useInfiniteQuery({
    queryKey: queryKeyFactory.reply({ commentId: commentId }).queryKey,
    queryFn: ({ pageParam }): Promise<GetReplyResType> => {
      return httpClient.get(pageParam);
    },
    initialPageParam: initialUrl,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.cursor && typeof lastPage.data.cursor !== "number") {
        return undefined;
      } else {
        return `/api/v1/article/${articleId}/comment/${commentId}/replies?cursor=${lastPage.data.cursor}&limit=${LIMIT}`;
      }
    },
  });
};

export default useGetReply;
