import React from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "stores/authStore";

import LogoIcon from "assets/images/logos/LogoIcon";

import useLogin from "apis/auth_apis/useLogin";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import { EMAIL_PATTERN, PASSWORD_PATTERN } from "constants/validations";

import classes from "./LoginPage.module.scss";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();

  const setAuthInfo = useAuthStore((state) => state.setAuthInfo);

  const { mutateAsync } = useLogin();

  const initialFormValues = {
    email: "",
    password: "",
  };

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValues,
  });

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const loginRes = await mutateAsync({
        email: data.email,
        password: data.password,
      });

      if (loginRes.success) {
        setAuthInfo(
          loginRes.data.accessToken,
          loginRes.data.accessTokenExpiredAt,
        );
        navigate("/mypage/subscribe");
      }
    } catch (e) {
      toast.error((e as Error).message);
    }
  };

  const onError = (e: FieldErrors) => {
    toast.error(e.root?.message);
  };

  return (
    <FormProvider {...methods}>
      <main className={classes.page_wrap}>
        <section className={classes.login_section}>
          <div className={classes.login_title_wrap}>
            <LogoIcon width={40} height={40} />
            <h2 className={classes.login_title}>로그인</h2>
          </div>
          <form
            className={classes.sign_form}
            onSubmit={methods.handleSubmit(onSubmit, onError)}
          >
            <div className={classes.login_input_wrap}>
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
            <div className={classes.login_notice_wrap}>
              <span>계정이 없으신가요?</span>
              <TextButton
                type="button"
                text="회원가입"
                p="s"
                theme="primary-line"
                onClick={handleSignupClick}
              />
            </div>
          </form>
        </section>
      </main>
    </FormProvider>
  );
};

export default LoginPage;
