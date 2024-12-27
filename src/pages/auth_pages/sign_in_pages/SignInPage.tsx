import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Outlet } from "react-router-dom";

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

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValue,
  });

  return (
    <main className={classes.page_wrap}>
      <FormProvider {...methods}>
        <Outlet />
      </FormProvider>
    </main>
  );
};

export default SignInPage;
