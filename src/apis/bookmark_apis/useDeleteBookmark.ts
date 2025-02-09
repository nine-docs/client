import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const deleteBookmarkResponse = {
  success: true,
  data: null,
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
