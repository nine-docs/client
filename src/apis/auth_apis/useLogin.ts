import { useMutation } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  accessTokenExpiredAt: string;
};

const mockData = {
  accessToken: "ejbqpio3wejdfqlkwaedsmvwejkflskedjf",
  accessTokenExpiredAt: "2025-01-03 10:01:10.152123",
};

const useLogin = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

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
        return httpClient.post(
          `/api/v1/login`,
          params,
        ) as Promise<LoginResponse>;
      }
    },
  });

  return { mutateAsync };
};

export default useLogin;
