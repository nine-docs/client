import React from "react";
import { Route, Routes } from "react-router-dom";

import EmailCertifyPage from "pages/auth_pages/email_certify_page/EmailCertifyPage";
import SignInPage from "pages/auth_pages/sign_in_page/SignInPage";
import SignUpPage from "pages/auth_pages/sign_up_page/SignUpPage";
import MainPage from "pages/main_page/MainPage";
import MyPage from "pages/my_page/MyPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin/email" element={<EmailCertifyPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
