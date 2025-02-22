import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useUpdateNickname = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newNickname }: { newNickname: string }) => {
      return httpClient.put(`/api/v1/my-page/profile/nickname`, {
        newNickname: newNickname,
      });
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
