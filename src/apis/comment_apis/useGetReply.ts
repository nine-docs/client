import { useInfiniteQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const LIMIT = 5;

type GetReplyResType = {
  success: boolean;
  errorCode?: string | null;
  data: {
    cursor: null | number;
    items: ReplyItemType[];
  };
};

const getReplyMockData: GetReplyResType = {
  success: true,
  errorCode: null,
  data: {
    cursor: 1,
    items: [
      {
        replyId: 1,
        content: "답글 내용",
        createdAt: "2025-02-22 01:01:01",
        updatedAt: "2025-02-22 01:01:01",
        author: {
          id: 1,
          nickname: "홍길동",
          isMe: true,
        },
        like: {
          count: 1,
          isUserLike: true,
        },
      },
    ],
  },
};

const useGetReply = (articleId: number, commentId: number) => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const initialUrl: string = `/api/v1/article/${articleId}/comment/${commentId}/replies?limit=${LIMIT}`;

  return useInfiniteQuery({
    queryKey: queryKeyFactory.reply({ commentId: commentId }).queryKey,
    queryFn: ({ pageParam }): Promise<GetReplyResType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(getReplyMockData), 100),
        );
      } else {
        return httpClient.get(pageParam);
      }
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
