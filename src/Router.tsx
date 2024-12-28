import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "pages/auth_pages/login_page/LoginPage";
import SignInPage from "pages/auth_pages/sign_in_pages/SignInPage";
import MainPage from "pages/main_page/MainPage";
import MyPage from "pages/my_page/MyPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
