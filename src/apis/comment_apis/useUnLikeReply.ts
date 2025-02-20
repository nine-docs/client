import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useUnLikeReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
      replyId,
    }: {
      articleId: number;
      commentId: number;
      replyId: number;
    }) => {
      return httpClient.delete(
        `/api/v1/article/${articleId}/comment/${commentId}/reply/${replyId}/like`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "reply"],
      });
    },
    onError: () => {
      toast.error("좋아요 해제에 실패했습니다.");
    },
  });
};

export default useUnLikeReply;
