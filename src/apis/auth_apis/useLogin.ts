import { useMutation } from "@tanstack/react-query";
import httpClient from "apis/networks/HttpClient";

type LoginPayload = {
  email: string;
  password: string;
};

const mockData = {
  success: true,
  errorCode: null,
  data: {
    accessToken: "ejbqpio3wejdfqlkwaedsmvwejkflskedjf",
    accessTokenExpiredAt: "2024-12-27 10:01:10.152123",
  },
};

const useLogin = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutateAsync } = useMutation({
    mutationFn: ({ email, password }: LoginPayload) => {
      const params = {
        email: email,
        password: password,
      };

      if (isApiMock) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockData), 100);
        });
      } else {
        return httpClient.post(`/api/v1/login`, params);
      }
    },
  });

  return { mutateAsync };
};

export default useLogin;
