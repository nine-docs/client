import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useAddReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
      content,
    }: {
      articleId: number;
      commentId: number;
      content: string;
    }) => {
      const params = {
        content: content,
      };

      return httpClient.post(
        `/api/v1/article/${articleId}/comment/${commentId}/reply`,
        params,
      );
    },
    onSuccess: () => {
      toast.success("대댓글이 작성되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "reply"],
      });
    },
    onError: () => {
      toast.error(`대댓글 작성에 실패했습니다.`);
    },
  });
};

export default useAddReply;
