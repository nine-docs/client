import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import useProfile from "apis/mypage_apis/useProfile";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./ProfilePage.module.scss";

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
            <BaseInput
              type="email"
              registerName={`email`}
              registerOption={{ required: "이메일을 입력해 주세요." }}
              placeholder="이메일을 입력해 주세요."
              disabled
            />
          </label>
          {/* 닉네임 */}
          <label className={classes.input_wrap}>
            <div className={classes.label}>닉네임</div>
            <div className={classes.input}>
              <BaseInput
                type="text"
                registerName={`nickname`}
                registerOption={{ required: "닉네임을 입력해 주세요." }}
                placeholder="닉네임을 입력해 주세요."
              />
            </div>
            <TextButton
              text="닉네임 변경"
              title="닉네임 변경"
              p="s"
              size="normal"
              height={"35"}
            />
          </label>
        </form>
      </main>
    </FormProvider>
  );
};

export default ProfilePage;
