import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuthStore } from "stores/authStore";

import httpClient from "apis/networks/HttpClient";

const deleteUserMockData = null;

const useDeleteUser = () => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const { deleteAuthInfo } = useAuthStore();

  return useMutation({
    mutationFn: () => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(deleteUserMockData), 100),
        );
      } else {
        return httpClient.post(`/api/v1/my-page/unregister`);
      }
    },
    onSuccess: () => {
      toast.success("탈퇴되었습니다.");
      deleteAuthInfo();
    },
    onError: () => {
      toast.error("탈퇴에 실패했습니다.");
    },
  });
};

export default useDeleteUser;
