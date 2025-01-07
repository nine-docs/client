import React from "react";

import useDeleteUser from "apis/auth_apis/useDeleteUser";

import TextButton from "components/buttons/text_button/TextButton";

const DeleteUserButton = () => {
  const { mutate } = useDeleteUser();

  const handleDeleteUserButtonClick = () => {
    mutate();
  };

  return (
    <TextButton
      theme="primary-line"
      text="회원 탈퇴"
      size="small"
      p="s"
      onClick={handleDeleteUserButtonClick}
    />
  );
};

export default DeleteUserButton;
