import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import useDeleteUser from "apis/auth_apis/useDeleteUser";
import useProfile from "apis/profile_apis/useProfile";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./ProfilePage.module.scss";
import NicknameInput from "./components/nickname_input/NicknameInput";
import PasswordUpdateModal from "./components/password_update_modal/PasswordUpdateModal";

const ProfilePage = () => {
  const [isPasswordEditModalOpen, setIsPasswordEditModalOpen] = useState(false);

  const { data: profileData, isLoading } = useProfile();
  const { mutate: deleteUserMutate } = useDeleteUser();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      nickname: "",
      email: "",
    },
  });

  const handleDeleteUserButtonClick = () => {
    deleteUserMutate();
  };

  useEffect(() => {
    if (isLoading) return;

    if (profileData.data.nickname === "" && profileData.data.email === "")
      return;

    methods.reset({
      nickname: profileData.data.nickname,
      email: profileData.data.email,
    });
  }, [methods, isLoading, profileData]);

  return (
    <FormProvider {...methods}>
      <main className={classes.page_wrap}>
        <form className={classes.form_wrap}>
          {/* 이메일 */}
          <label className={classes.input_wrap}>
            <div className={classes.label}>이메일</div>
            <BaseInput type="email" registerName={`email`} disabled />
          </label>
          {/* 닉네임 */}
          <NicknameInput />
          {/* 비밀번호 */}
          <TextButton
            width={"100%"}
            theme="primary-line"
            text="비밀번호 변경하기"
            onClick={() => setIsPasswordEditModalOpen(true)}
          />
          {/* 회원탈퇴 */}
          <TextButton
            width={"100%"}
            theme="primary-line"
            text="회원 탈퇴"
            onClick={handleDeleteUserButtonClick}
          />
        </form>
      </main>
      <AnimatePresence>
        {isPasswordEditModalOpen && (
          <PasswordUpdateModal
            onClose={() => {
              setIsPasswordEditModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </FormProvider>
  );
};

export default ProfilePage;
