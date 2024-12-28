import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LogoIcon from "assets/images/logos/LogoIcon";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import { EMAIL_PATTERN, PASSWORD_PATTERN } from "constants/validations";

import classes from "./SignInPage.module.scss";

type FormValues = {
  nickname: string;
  email: string;
  password: string;
  passwordCheck: string;
};

const SignInPage = () => {
  const initialFormValue = {
    nickname: "",
    email: "",
    password: "",
    passwordCheck: "",
  };

  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValue,
  });

  const handleLoginClick = () => {
    navigate("/signup");
  };

  const onSubmit = () => {
    navigate("/signin");
  };

  const onError = () => {};

  return (
    <main className={classes.page_wrap}>
      <FormProvider {...methods}>
        <section className={classes.signin_section}>
          <div className={classes.signin_title_wrap}>
            <LogoIcon width={40} height={40} />
            <h2 className={classes.signin_title}>회원가입</h2>
          </div>
          <form
            className={classes.sign_form}
            onSubmit={methods.handleSubmit(onSubmit, onError)}
          >
            <div className={classes.signin_input_wrap}>
              <BaseInput
                type="text"
                width="100%"
                placeholder="닉네임"
                align="start"
                registerName="nickname"
                registerOption={{
                  required: "닉네임을 입력해 주세요.",
                }}
              />
              <div className={classes.signin_input_button_wrap}>
                <BaseInput
                  type="text"
                  width="100%"
                  placeholder="이메일"
                  align="start"
                  registerName="email"
                  registerOption={{
                    required: "이메일을 입력해 주세요.",
                    pattern: {
                      value: EMAIL_PATTERN,
                      message: "유효하지 않은 이메일 형식입니다.",
                    },
                  }}
                />
                <TextButton
                  type="button"
                  width={"120px"}
                  height="35"
                  text="인증번호 받기"
                  theme="primary-line"
                  p="s"
                  size="small"
                />
              </div>
              <BaseInput
                type="password"
                width="100%"
                placeholder="비밀번호"
                align="start"
                registerName="password"
                registerOption={{
                  required: "비밀번호를 입력해 주세요",
                  pattern: {
                    value: PASSWORD_PATTERN,
                    message: "영문+숫자를 포함한 6자리 이상을 입력해 주세요.",
                  },
                }}
              />
              <BaseInput
                type="password"
                width="100%"
                placeholder="비밀번호 확인"
                align="start"
                registerName="passwordCheck"
                registerOption={{}}
              />
            </div>
            <TextButton
              type="submit"
              text="회원가입"
              width={"100%"}
              size="xlarge"
            />
            <div className={classes.login_notice_wrap}>
              <span>이미 회원이신가요?</span>
              <TextButton
                type="button"
                text="로그인"
                theme="primary-line"
                p="s"
                size="normal"
                onClick={handleLoginClick}
              />
            </div>
          </form>
        </section>
      </FormProvider>
    </main>
  );
};

export default SignInPage;
