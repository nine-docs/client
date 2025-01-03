import React from "react";
import { Route, Routes } from "react-router-dom";

import ArticlePage from "pages/article_page/ArticlePage";
import LoginPage from "pages/auth_pages/login_page/LoginPage";
import SignUpPage from "pages/auth_pages/sign_up_page/SignUpPage";
import MainPage from "pages/main_page/MainPage";
import MyPage from "pages/my_page/MyPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/mypage/*" element={<MyPage />} />
      <Route path="/article/:articleId" element={<ArticlePage />} />
    </Routes>
  );
};

export default Router;
