import { useMutation } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";

type EmailPayload = {
  email: string;
};

type EmailResponse = {
  success: boolean;
  data: {
    verificationCodeExpiredAt: string;
  };
};

const mockData = {
  success: true,
  data: {
    verificationCodeExpiredAt: "2024-12-27 11:31:11.123123",
  },
};

const useEmailSend = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { mutateAsync } = useMutation({
    mutationFn: ({ email }: EmailPayload): Promise<EmailResponse> => {
      const params = {
        email: email,
      };

      if (isApiMock) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockData), 100);
        });
      } else {
        return httpClient.post(
          `/api/v1/register/email-verification-code`,
          params,
        );
      }
    },
  });

  return { mutateAsync };
};

export default useEmailSend;
