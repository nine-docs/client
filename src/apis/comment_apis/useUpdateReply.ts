import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useUpdateReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
      replyId,
      content,
    }: {
      articleId: number;
      commentId: number;
      replyId: number;
      content: string;
    }) => {
      const params = {
        content: content,
      };

      return httpClient.put(
        `/api/v1/article/${articleId}/comment/${commentId}/reply/${replyId}`,
        params,
      );
    },
    onSuccess: () => {
      toast.success(`대댓글이 수정되었습니다.`);
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "reply"],
      });
    },
    onError: () => {
      toast.error("대댓글 수정에 실패했습니다.");
    },
  });
};

export default useUpdateReply;
