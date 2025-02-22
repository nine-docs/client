import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

type UseUpdateNicknameMockData = {
  success: boolean;
  errorCode?: string | null;
  data: {
    nickname: string;
    email: string;
  };
};

const updateNicknameMockData: UseUpdateNicknameMockData = {
  success: true,
  errorCode: null,
  data: {
    nickname: "홍길동",
    email: "helim01033@naver.com",
  },
};

const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      newNickname,
    }: {
      newNickname: string;
    }): Promise<UseUpdateNicknameMockData> => {
      const isApiMock = process.env.REACT_APP_API_MOCK === "true";

      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(updateNicknameMockData), 100),
        );
      } else {
        return httpClient.put(`/api/v1/my-page/profile/nickname`, {
          newNickname: newNickname,
        });
      }
    },
    onSuccess: () => {
      toast.success(`닉네임이 변경되었습니다.`);
      queryClient.invalidateQueries({
        queryKey: ["ninedocs", "profile"],
      });
    },
    onError: () => {
      toast.error(`닉네임 변경에 실패했습니다.`);
    },
  });
};

export default useUpdateNickname;
