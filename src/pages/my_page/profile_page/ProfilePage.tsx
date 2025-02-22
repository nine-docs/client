import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import useProfile from "apis/profile_apis/useProfile";

import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./ProfilePage.module.scss";
import NicknameInput from "./components/nickname_input/NicknameInput";

const ProfilePage = () => {
  const { data: profileData, isLoading } = useProfile();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      nickname: "",
      email: "",
    },
  });

  useEffect(() => {
    if (isLoading) return;

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
        </form>
      </main>
    </FormProvider>
  );
};

export default ProfilePage;
