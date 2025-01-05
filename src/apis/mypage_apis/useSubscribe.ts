import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

type CategoryType = {
  id: number;
  name: string;
};

type SubscribeListType = {
  categories: Array<CategoryType>;
  mailReceivingSchedule: {
    dayOfWeek: Array<string>;
  };
};

type GetCategoryListType = {
  categories: Array<CategoryType>;
};

type UpdateSubscribeResType = {
  categories: Array<CategoryType>;
};

/* 전체 수신주기 카테고리 조회 API Hook의 return data type */
type AllSubscribeCycleType = {
  schedules: Array<"MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN">;
};

/* 메일 수신 주기 변경 API Hook의 return data type */
type UpdateSubscribeCycleResponseType = {
  mailReceivingSchedule: {
    dayOfWeek: Array<string>;
  };
};

/* 구독정보 조회 응답 목데이터 */
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

/* 전체 카테고리 응답 목데이터 */
const categoryMockData = {
  categories: [
    {
      id: 1,
      name: "Kubernetes",
    },
    {
      id: 2,
      name: "Helm",
    },
    {
      id: 3,
      name: "Java",
    },
    {
      id: 4,
      name: "Javascript",
    },
    {
      id: 5,
      name: "Python",
    },
    {
      id: 6,
      name: "Redis",
    },
  ],
};

/* 구독정보 업데이터 응답 목데이터 */
const updateSubscribeMockData = {
  categories: [
    {
      id: 1,
      name: "Kubernetes",
    },
    {
      id: 3,
      name: "Java",
    },
  ],
};

/* 전체 메일수신주기 조회 응답 목데이터 */
const allMailCycleMockData = {
  schedules: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as Array<
    "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"
  >,
};

/* 메일수신주기 변경 응답 목데이터 */
const updateMailCycleResMockData = {
  mailReceivingSchedule: {
    dayOfWeek: ["MON", "WED", "SAT"] as Array<
      "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"
    >,
  },
};

/* 내 구독 목록 조회 API Hook */
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
    queryFn: (): Promise<SubscribeListType> => {
      if (isApiMock) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(subscribeListMockData), 300);
        });
      } else {
        return httpClient.get(`/api/v1/my-page/subscription`);
      }
    },
  });

  return { data };
};

/* 전체 구독 카테고리 조회 API Hook */
export const useGetCategoryList = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    categories: [],
  };

  const { data = fallback } = useQuery({
    queryKey: queryKeyFactory.allCategory().queryKey,
    queryFn: (): Promise<GetCategoryListType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(categoryMockData), 100),
        );
      } else {
        return httpClient.get(`/api/v1/my-page/subscription/all-categories`);
      }
    },
  });

  return { data };
};

/* 구독 카테고리 변경 API Hook */
export const useUpdateSubscribe = () => {
  const queryClient = useQueryClient();

  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutateAsync } = useMutation({
    mutationFn: ({
      categoryIds,
    }: {
      categoryIds: Array<number>;
    }): Promise<UpdateSubscribeResType> => {
      const params = { categoryIds: categoryIds };

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(updateSubscribeMockData), 100),
        );
      } else {
        return httpClient.post(
          `/api/v1/my-page/subscription/my-categories`,
          params,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "subscribe"],
      });
    },
  });

  return { mutateAsync };
};

/* 전체 수신주기 카테고리 조회 API Hook */
export const useGetSubscribeCycleList = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const fallback = {
    schedules: [],
  };

  const { data = fallback } = useQuery({
    queryKey: queryKeyFactory.allSubscribeCycle().queryKey,
    queryFn: (): Promise<AllSubscribeCycleType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(allMailCycleMockData), 100),
        );
      } else {
        return httpClient.get(
          `/api/v1/my-page/subscription/available-schedules`,
        );
      }
    },
  });

  return { data };
};

/* 메일 수신 주기 변경 API Hook */
export const useUpdateSubscribeCycle = () => {
  const queryClient = useQueryClient();

  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutate } = useMutation({
    mutationFn: (): Promise<UpdateSubscribeCycleResponseType> => {
      const params = {};

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(updateMailCycleResMockData), 100),
        );
      } else {
        return httpClient.post(`/api/v1/my-page/subscription/schedule`, params);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ninedocs", "subscribe"] });
    },
  });

  return { mutate };
};
