import { useInfiniteQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const LIMIT = 10;

type ArticleType = {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
};

type BookmarkItemType = {
  bookmarkId: number;
  article: ArticleType;
};

type GetBookMarkListResponse = {
  success: boolean;
  data: {
    cursor: number | null;
    items: BookmarkItemType[];
  };
};

const bookMarkListMockData: GetBookMarkListResponse = {
  success: true,
  data: {
    cursor: null, // 직전 페이지의 마지막 북마크 id
    items: [
      {
        bookmarkId: 1,
        article: {
          id: 55,
          title: "Ingress 란?",
          category: {
            id: 1,
            name: "Kubernetes",
          },
        },
      },
      {
        bookmarkId: 2,
        article: {
          id: 45,
          title: "React의 다양한 상태관리 라이브러리의 동향 (2024)",
          category: {
            id: 10,
            name: "Frontend",
          },
        },
      },
    ],
  },
};

const useGetBookmark = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const initialUrl = `/api/v1/my-page/bookmarks?limit=${LIMIT}`;

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
    isError,
    data,
  } = useInfiniteQuery({
    queryKey: queryKeyFactory.bookmark().queryKey,
    queryFn: ({ pageParam }): Promise<GetBookMarkListResponse> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(bookMarkListMockData), 100),
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
        return `/api/v1/my-page/bookmarks?cursor=${lastPage.data.cursor}&limit=${LIMIT}`;
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

export default useGetBookmark;
