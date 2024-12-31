import { createQueryKeys } from "@lukemorales/query-key-factory";

const queryKeyFactory = createQueryKeys("ninedocs", {
  subscribe: (params?: object) => [{ ...params }],
  bookmark: (params?: object) => [{ ...params }],
  article: (params?: object) => [{ ...params }],
});

export default queryKeyFactory;
