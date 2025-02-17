import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const updateCommentMockData = {
  success: true,

  errorCode: null,
  data: {
    commentId: 10,
    content: "수정된 댓글 내용",
    createdAt: "2024-12-26 10:12:35.521",
    updatedAt: "2024-12-26 11:03:00.100",
  },
};

const useUpdateComment = () => {
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
      const isApiMock = process.env.REACT_APP_API_MOCK === "true";

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(updateCommentMockData), 100),
        );
      } else {
        return httpClient.put(
          `/api/v1/article/${articleId}/comment/${commentId}`,
          {
            content: content,
          },
        );
      }
    },
    onSuccess: () => {
      toast.success("댓글이 수정되었습니다.");

      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "comment"],
      });
    },
  });
};

export default useUpdateComment;
