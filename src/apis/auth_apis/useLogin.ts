import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";

import httpClient from "apis/networks/HttpClient";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  data: {
    accessToken: string;
    accessTokenExpiredAt: string;
  };
};

const useLogin = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const mockData = {
    success: true,
    data: {
      accessToken: "ejbqpio3wejdfqlkwaedsmvwejkflskedjf",
      accessTokenExpiredAt: dayjs()
        .add(1, "month")
        .format("yyyy-mm-dd HH:mm:ss"), //"2025-01-03 10:01:10.152123"
    },
  };

  const { mutateAsync } = useMutation({
    mutationFn: ({ email, password }: LoginPayload): Promise<LoginResponse> => {
      const params = {
        email: email,
        password: password,
      };

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(mockData), 1000),
        );
      } else {
        return httpClient.post(`/api/v1/login`, params);
      }
    },
  });

  return { mutateAsync };
};

export default useLogin;
