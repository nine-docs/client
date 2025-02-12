import { useInfiniteQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

type GetCommentsResType = {
  success: boolean;
  data: {
    cursor: number | null;
    items: CommentItemType[];
  };
};

const LIMIT = 5;

export const useGetComment = (articleId: number) => {
  const initialUrl: string = `/api/v1/article/${articleId}/comments?limit=${LIMIT}`;

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    promise,
    isLoading,
    isFetching,
    isError,
    data,
  } = useInfiniteQuery({
    queryKey: ["ninedocs", "comment", `${articleId}`],
    queryFn: ({ pageParam }) => httpClient.get(pageParam),
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
    promise,
    isLoading,
    isFetching,
    isError,
    data,
  };
};
