import { getValue } from "@testing-library/user-event/dist/utils";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LogoIcon from "assets/images/logos/LogoIcon";

import useCodeCheck from "apis/auth_apis/useCodeCheck";
import useEmailSend from "apis/auth_apis/useEmailSend";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import { EMAIL_PATTERN, PASSWORD_PATTERN } from "constants/validations";

import classes from "./SignUpPage.module.scss";

type FormValues = {
  nickname: string;
  email: string;
  authCode: string;
  password: string;
  passwordCheck: string;
};

const SignUpPage = () => {
  const navigate = useNavigate();

  const [isAuthCodeChecked, setIsAuthCodeChecked] = useState(false);

  const { mutateAsync: sendEmailMutateAsync } = useEmailSend();
  const { mutateAsync: codeCheckMutateAsync } = useCodeCheck();

  const initialFormValue = {
    nickname: "",
    email: "",
    authCode: "",
    password: "",
    passwordCheck: "",
  };

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValue,
  });

  /* 로그인 버튼 누르면 실행되는 함수 */
  const handleLoginClick = () => {
    navigate("/login");
  };

  /* 인증번호 받기 버튼 누르면 실행되는 함수 */
  const getAuthCode = async () => {
    try {
      const emailSendRes = await sendEmailMutateAsync({
        email: methods.getValues("email"),
      });
      toast.success(`인증번호가 발송되었습니다.\n이메일을 확인해 주세요.`);
    } catch (e) {
      toast.error("인증번호 발송에 실패했습니다.");
    }
  };

  /* 인증번호 확인 버튼 누르면 실행되는 함수 */
  const checkAuthCode: () => void = async () => {
    try {
      const res = await codeCheckMutateAsync({
        email: methods.getValues("email"),
        emailVerificationCode: methods.getValues("authCode"),
      });

      toast.success("이메일이 인증되었습니다.");
      setIsAuthCodeChecked(true);
    } catch (e) {
      methods.setError("authCode", {
        type: "authCheck",
        message: "인증번호 확인이 필요합니다.",
      });
      setIsAuthCodeChecked(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!isAuthCodeChecked) {
      toast.error("이메일 인증을 완료해 주세요.");
      methods.setError("authCode", {
        type: "authCheck",
        message: "인증번호 확인이 필요합니다.",
      });
      return;
    }
  };

  const onError = () => {};

  return (
    <main className={classes.page_wrap}>
      <FormProvider {...methods}>
        <section className={classes.signup_section}>
          <div className={classes.signup_title_wrap}>
            <LogoIcon width={40} height={40} />
            <h2 className={classes.signup_title}>회원가입</h2>
          </div>
          <form
            className={classes.sign_form}
            onSubmit={methods.handleSubmit(onSubmit, onError)}
          >
            <div className={classes.signup_input_wrap}>
              {/* 닉네임 */}
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
              {/* 이메일 */}
              <div className={`${classes.signup_input_button_wrap}`}>
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
                  height={"35"}
                  text="인증번호 받기"
                  theme="primary-line"
                  p="s"
                  size="small"
                  onClick={getAuthCode}
                />
              </div>
              {/* 인증번호 입력 */}
              <div className={classes.input_with_success_text}>
                {/* 버튼과 input UI */}
                <div className={classes.signup_input_button_wrap}>
                  <BaseInput
                    type="text"
                    width="100%"
                    placeholder="인증번호"
                    align="start"
                    registerName="authCode"
                    registerOption={{
                      required: "인증번호를 입력해 주세요.",
                    }}
                  />
                  <TextButton
                    type="button"
                    width={"120px"}
                    height={"35"}
                    text="인증번호 확인"
                    theme="primary-line"
                    p="s"
                    size="small"
                    onClick={checkAuthCode}
                  />
                </div>
              </div>
              {/* 비밀번호 입력 */}
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
              {/* 비밀번호 확인 */}
              <BaseInput
                type="password"
                width="100%"
                placeholder="비밀번호 확인"
                align="start"
                registerName="passwordCheck"
                registerOption={{
                  required: "비밀번호를 다시 입력해 주세요.",
                }}
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

export default SignUpPage;
