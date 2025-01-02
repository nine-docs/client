import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

const alarmListMockData = null;

export const useGetAlarmList = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { data } = useQuery({
    queryKey: queryKeyFactory.alarm().queryKey,
    queryFn: () => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(alarmListMockData), 100),
        );
      } else {
        return httpClient.get(`/api/v1/notification`);
      }
    },
  });

  return { data };
};
