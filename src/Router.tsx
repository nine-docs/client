import React from "react";
import { Route, Routes } from "react-router-dom";

import SignInPage from "pages/auth_pages/sign_in_pages/SignInPage";
import EmailCertifyPage from "pages/auth_pages/sign_in_pages/email_certify_page/EmailCertifyPage";
import SignInInfoPage from "pages/auth_pages/sign_in_pages/sign_in_page/SignInInfoPage";
import SignUpPage from "pages/auth_pages/sign_up_page/SignUpPage";
import MainPage from "pages/main_page/MainPage";
import MyPage from "pages/my_page/MyPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />}>
        <Route path="info" element={<SignInInfoPage />} />
        <Route path="auth" element={<EmailCertifyPage />} />
      </Route>
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
