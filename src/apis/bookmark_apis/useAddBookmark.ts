import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const addBookmarkMockData = {
  bookmarkId: 53,
  articleId: 12,
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutate } = useMutation({
    mutationFn: ({ articleId }: { articleId: number }) => {
      const params = {
        "article-id": articleId,
      };

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(addBookmarkMockData), 100),
        );
      } else {
        return httpClient.post(`/api/v1/bookmark`, params);
      }
    },
    onSuccess: () => {
      toast.success("북마크가 추가되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "bookmark"],
      });
    },
    onError: () => {
      toast.error("북마크 추가에 실패했습니다.");
    },
  });

  return { mutate };
};
