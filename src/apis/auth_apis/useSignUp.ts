import { useMutation } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";

type SignupPayloadType = {
  email: string;
  nickname: string;
  password: string;
};

type SignupResponseType = {
  success: boolean;
  data: {
    userId: number;
    accessToken: string;
    accessTokenExpiredAt: string;
  };
};

const useSignUp = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({
      email,
      nickname,
      password,
    }: SignupPayloadType): Promise<SignupResponseType> => {
      const params = {
        email,
        nickname,
        password,
      };
      return httpClient.post(`api/v1/register`, params);
    },
  });

  return { mutateAsync };
};

export default useSignUp;
