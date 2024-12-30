import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const subscribeListMockData = {
  categories: [
    // 내가 구독한 카테고리 목록
    {
      id: 1,
      name: "Kubernetes",
    },
    {
      id: 2,
      name: "Helm",
    },
  ],
  mailReceivingSchedule: {
    dayOfWeek: ["MON", "WED", "SAT"],
  },
};

export const useGetSubscribeList = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    categories: [],
    mailReceivingSchedule: {
      dayOfWeek: [],
    },
  };

  const { data = fallback } = useQuery({
    queryKey: queryKeyFactory.subscribe().queryKey,
    queryFn: () => {
      if (isApiMock) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(subscribeListMockData), 100);
        });
      } else {
        return httpClient.get(`/api/v1/my-page/subscription`);
      }
    },
  });

  return { data };
};
