import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import LogoIcon from "assets/images/logos/LogoIcon";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import { EMAIL_PATTERN, PASSWORD_PATTERN } from "constants/validations";

import classes from "./SignUpPage.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValues,
  });

  const handleSigninClick = () => {
    navigate("/signin");
  };

  const onSubmit = () => {};

  const onError = () => {};

  return (
    <FormProvider {...methods}>
      <main className={classes.page_wrap}>
        <section className={classes.signup_section}>
          <div className={classes.signup_title_wrap}>
            <LogoIcon width={40} height={40} />
            <h2 className={classes.signup_title}>로그인</h2>
          </div>
          <form
            className={classes.sign_form}
            onSubmit={methods.handleSubmit(onSubmit, onError)}
          >
            <div className={classes.signup_input_wrap}>
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
            </div>
            <TextButton
              type="submit"
              text="로그인"
              width="100%"
              size="xlarge"
            />
            <div className={classes.signin_notice_wrap}>
              <span>계정이 없으신가요?</span>
              <TextButton
                type="button"
                text="회원가입"
                p="s"
                theme="primary-line"
                onClick={handleSigninClick}
              />
            </div>
          </form>
        </section>
      </main>
    </FormProvider>
  );
};

export default SignUpPage;
