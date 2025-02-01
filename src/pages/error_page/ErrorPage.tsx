import React from "react";

import ErrorIcon from "assets/images/icons/ErrorIcon";

import classes from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <div className={classes.page_wrap}>
      <ErrorIcon width={40} height={40} />
      <h1>NOT FOUND</h1>
    </div>
  );
};

export default ErrorPage;
