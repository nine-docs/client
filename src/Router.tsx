import React from "react";
import { Route, Routes } from "react-router-dom";

import SignInPage from "pages/auth_pages/sign_in_pages/SignInPage";
import SignUpPage from "pages/auth_pages/sign_up_page/SignUpPage";
import MainPage from "pages/main_page/MainPage";
import MyPage from "pages/my_page/MyPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
