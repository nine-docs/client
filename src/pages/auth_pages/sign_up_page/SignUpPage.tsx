import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LogoIcon from "assets/images/logos/LogoIcon";

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
  const initialFormValue = {
    nickname: "",
    email: "",
    authCode: "",
    password: "",
    passwordCheck: "",
  };

  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValue,
  });

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const checkAuthCode = async () => {
    const isValid = await methods.trigger("authCode");

    if (isValid) {
      /* 인증코드 API 호출 */
      try {
        setIsAuthChecked(true);
      } catch (e) {
        setIsAuthChecked(false);
      }
    } else {
      toast.error(methods.formState?.errors["authCode"]?.message);
    }
  };

  const onSubmit = (data: FormValues) => {};

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
                {/* 성공 메세지 */}
                {isAuthChecked && (
                  <span className={classes.success_text}>
                    인증이 완료되었습니다.
                  </span>
                )}
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
