import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useAddComment = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({
      articleId,
      content,
    }: {
      articleId: number;
      content: string;
    }) => {
      const params = {
        content: content,
      };
      return httpClient.post(`/api/v1/article/${articleId}/comment`, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "comment"],
      });
      toast.success("댓글이 등록되었습니다.");
    },
    onError: () => {
      toast.error("댓글 등록에 실패했습니다.");
    },
  });

  return { mutate };
};

export default useAddComment;
