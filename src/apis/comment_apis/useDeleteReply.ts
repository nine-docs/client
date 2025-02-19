import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useDeleteReply = () => {
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
        `/api/v1/article/${articleId}/comment/${commentId}/reply/${replyId}`,
      );
    },
    onSuccess: () => {
      toast.success("대댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "reply"],
      });
    },
  });
};

export default useDeleteReply;
