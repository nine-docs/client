import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useLikeComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
    }: {
      articleId: number;
      commentId: number;
    }) => {
      return httpClient.post(
        `/api/v1/article/${articleId}/comment/${commentId}/like`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "comment"],
      });
    },
    onError: () => {
      toast.error("좋아요에 실패했습니다.");
    },
  });
};

export default useLikeComment;
