import { useMutation } from "@tanstack/react-query";

type EmailPayload = {
  email: string;
};

const mockData = {
  success: true,
  errorCode: null,
  data: {
    verificationCodeExpiredAt: "2024-12-27 11:31:11.123123",
  },
};

const useEmailSend = () => {
  const { mutateAsync } = useMutation({
    mutationFn: ({ email }: EmailPayload) => {
      const params = {
        email: email,
      };

      return new Promise((resolve) => {
        setTimeout(() => resolve(mockData), 100);
      });
    },
  });

  return { mutateAsync };
};

export default useEmailSend;
