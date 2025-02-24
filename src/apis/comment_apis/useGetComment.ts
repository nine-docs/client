import { useInfiniteQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const LIMIT = 10;

type CommentType = {
  commentId: number;
  author: {
    id: number;
    nickname: string;
    isMe: boolean;
  };
  reply: {
    count: number;
  };
  content: string;
  like: {
    count: number;
    isUserLike: boolean;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

type GetCommentResType = {
  success: boolean;
  errorCode?: string;
  data: {
    cursor: number | null;
    items: CommentType[];
  };
};

const mockData: GetCommentResType = {
  success: true,
  errorCode: "",
  data: {
    cursor: 0,
    items: [
      {
        commentId: 0,
        author: {
          id: 0,
          nickname: "홍길동",
          isMe: true,
        },
        reply: {
          count: 1,
        },
        content:
          "댓글내용 앤터입니다.\n긴내용긴내용긴내용n긴내용긴내용긴n긴내용긴내용긴내용n긴내용긴내용긴내용n긴내용긴내용긴내용n긴내용긴내용긴내용n긴내용긴내용긴내용내용n긴내용긴내용긴내용n긴내용긴내용긴내용",
        like: {
          count: 1,
          isUserLike: false,
        },
        createdAt: "2025-02-15T08:02:49.155Z",
        updatedAt: "2025-02-15T08:02:49.155Z",
        deletedAt: "2025-02-15T08:02:49.155Z",
      },
    ],
  },
};

export const useGetComment = (articleId: number) => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const initialUrl: string = `/api/v1/article/${articleId}/comments?limit=${LIMIT}`;

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    data,
  } = useInfiniteQuery({
    queryKey: queryKeyFactory.comment({ articleId: articleId }).queryKey,
    queryFn: ({ pageParam }): Promise<GetCommentResType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(mockData), 100),
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
        return `api/v1/article/${articleId}/comments?cursor=${lastPage.data.cursor}&limit=${LIMIT}`;
      }
    },
  });

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    data,
  };
};
