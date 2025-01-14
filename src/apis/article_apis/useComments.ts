import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const mockData = {
  cursor: 21,
  items: [
    {
      commentId: 25,
      author: {
        id: 10,
        nickname: "김예림",
      },
      reply: {
        count: 5,
      },
      content: "댓글내용 댓글내용 ~!!!!!! 1234567",
      createdAt: "2024-12-26 23:11:25.195",
      updatedAt: "2024-12-26 23:11:25.195",
    },
    {
      commentId: 21,
      author: {
        id: 126,
        nickname: "홍길동",
      },
      reply: {
        count: 0,
      },
      content: "댓글내용 댓글내용 ~!!!!!! 1234567",
      createdAt: "2024-12-26 23:11:25.195",
      updatedAt: "2024-12-26 23:11:25.195",
    },
  ],
};

export const useComments = (
  articleId: number,
  cursor: number,
  limit: number,
) => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const params = {
    articleId,
    cursor,
    limit,
  };

  const { data } = useQuery({
    queryKey: queryKeyFactory.comments(params).queryKey,
    queryFn: () => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(mockData), 100),
        );
      } else {
        return httpClient.get(
          `/api/v1/article/${articleId}/comments?cursor=${cursor}&limit=${limit}`,
        );
      }
    },
  });

  return { data };
};
