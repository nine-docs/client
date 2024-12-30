import { useMutation } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";

type CodeCheckPayload = {
  email: string;
  emailVerificationCode: string;
};

type CodeCheckResponse = {
  verificationExpiredAt: string;
};

const mockData = {
  verificationExpiredAt: "2024-12-20 16:31:01.123",
};

const useCodeCheck = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutateAsync } = useMutation({
    mutationFn: ({
      email,
      emailVerificationCode,
    }: CodeCheckPayload): Promise<CodeCheckResponse> => {
      const params = {
        email: email,
        emailVerificationCode: emailVerificationCode,
      };

      if (isApiMock) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockData), 100);
        });
      } else {
        return httpClient.post(`/api/v1/register/email-verification`, params);
      }
    },
  });

  return { mutateAsync };
};

export default useCodeCheck;
