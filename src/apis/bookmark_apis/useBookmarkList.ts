import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

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
    cursor: number;
    items: BookmarkItemType[];
  };
};

const bookMarkListMockData = {
  success: true,
  data: {
    cursor: 42, // 직전 페이지의 마지막 북마크 id
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

export const useGetBookmarkList = (cursor: number | null, limit: number) => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    success: true,
    data: {
      cursor: 0,
      items: [],
    },
  };

  const { data = fallback, isError } = useQuery({
    queryKey: queryKeyFactory.bookmark({ cursor: cursor, limit: limit })
      .queryKey,
    queryFn: (): Promise<GetBookMarkListResponse> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(bookMarkListMockData), 100),
        );
      } else {
        return httpClient.get(
          `/api/v1/my-page/bookmarks?${!!cursor ? `cursor=${cursor}&` : ``}limit=${limit}`,
        );
      }
    },
  });

  return { data, isError };
};
