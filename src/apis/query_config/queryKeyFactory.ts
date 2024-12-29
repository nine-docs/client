import { createQueryKeys } from "@lukemorales/query-key-factory";

const queryKeyFactory = createQueryKeys("ninedocs", {
  subscribe: (params) => [{ ...params }],
});

export default queryKeyFactory;
