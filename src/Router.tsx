import React from "react";
import { Route, Routes } from "react-router-dom";

import MainPage from "pages/main_page/MainPage";
import MyPage from "pages/my_page/MyPage";
import SignInPage from "pages/sign_in_page/SignInPage";
import SignUpPage from "pages/sign_up_page/SignUpPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
