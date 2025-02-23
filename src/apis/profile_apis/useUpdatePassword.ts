import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import httpClient from "apis/networks/HttpClient";

const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({
      originalPassword,
      newPassword,
    }: {
      originalPassword: string;
      newPassword: string;
    }) => {
      return httpClient.put(`/api/v1/my-page/profile/password`, {
        originalPassword,
        newPassword,
      });
    },
    onSuccess: () => {
      toast.success(`비밀번호가 변경되었습니다.`);
    },
    onError: () => {
      toast.error("비밀번호 변경에 실패했습니다.");
    },
  });
};

export default useUpdatePassword;
