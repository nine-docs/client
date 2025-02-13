import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
    }: {
      articleId: number;
      commentId: number;
    }) => {
      return httpClient.delete(
        `/api/v1/article/${articleId}/comment/${commentId}`,
      );
    },
    onSuccess: () => {
      toast.success("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "comment"],
      });
    },
    onError: () => {
      toast.error("댓글 삭제에 실패했습니다.");
    },
  });
};

export default useDeleteComment;
