import React from "react";

import ErrorIcon from "assets/images/icons/ErrorIcon";

import TextButton from "components/buttons/text_button/TextButton";

import classes from "./ErrorPage.module.scss";

const ErrorPage = () => {
  const handleGoHomeClick = () => {
    window.location.href = "/";
  };

  return (
    <div className={classes.page_wrap}>
      <ErrorIcon width={40} height={40} />
      <h1>NOT FOUND</h1>
      <TextButton
        theme="primary-line"
        width={"150px"}
        onClick={handleGoHomeClick}
        text="홈으로 가기"
      />
    </div>
  );
};

export default ErrorPage;
