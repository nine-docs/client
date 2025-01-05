import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
      bookmarkId: 55,
      article: {
        id: 12,
        title: "Ingress 란?",
        category: {
          id: 1,
          name: "Kubernetes",
        },
      },
    },
    {
      bookmarkId: 42,
      article: {
        id: 14,
        title: "React의 다양한 상태관리 라이브러리의 동향 (2024)",
        category: {
          id: 10,
          name: "Frontend",
        },
      },
    },
  ],
};

const deleteBookmarkResponse = null;

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

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutate } = useMutation({
    mutationFn: ({ bookmarkId }: { bookmarkId: number }) => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(deleteBookmarkResponse)),
        );
      } else {
        return httpClient.delete(`/api/v1/bookmark/${bookmarkId}`);
      }
    },
    onSuccess: () => {
      toast.success("북마크가 해제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "bookmark"],
      });
    },
    onError: () => {
      toast.error("북마크 해제에 실패했습니다.");
    },
  });

  return { mutate };
};
