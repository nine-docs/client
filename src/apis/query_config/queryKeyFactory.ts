import { createQueryKeys } from "@lukemorales/query-key-factory";

const queryKeyFactory = createQueryKeys("ninedocs", {
  subscribe: (params?: object) => [{ ...params }],
});

export default queryKeyFactory;
