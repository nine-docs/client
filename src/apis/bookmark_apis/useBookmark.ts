import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

type getBookMarkListResponse = {
  data: {
    cursor: number;
    items: Array<{
      bookmarkId: number;
      article: {
        id: number;
        title: string;
        category: {
          id: number;
          name: string;
        };
      };
    }>;
  };
};

const bookMarkListMockData = {
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
};

export const useGetBookmarkList = (
  cursor: number,
  limit: number,
): getBookMarkListResponse => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    cursor: 0,
    items: [],
  };

  const { data = fallback } = useQuery<getBookMarkListResponse["data"]>({
    queryKey: queryKeyFactory.bookmark({ cursor: cursor, limit: limit })
      .queryKey,
    queryFn: () => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(bookMarkListMockData), 100),
        );
      } else {
        return httpClient.get(
          `/api/v1/bookmarks?cursor=${cursor}&limit=${limit}`,
        );
      }
    },
  });

  return { data };
};
