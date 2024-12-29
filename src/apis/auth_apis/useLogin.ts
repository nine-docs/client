import { useMutation } from "@tanstack/react-query";

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
  const { mutateAsync } = useMutation({
    mutationFn: ({ email, password }: LoginPayload) => {
      const params = {
        email: email,
        password: password,
      };

      return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 100);
      });
    },
  });

  return { mutateAsync };
};

export default useLogin;
