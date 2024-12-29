import { useNavigate } from "react-router-dom";

import TextButton from "components/buttons/text_button/TextButton";

import classes from "./MainPage.module.scss";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      {/* 첫번째 소개 Section */}
      <section className={classes.first_section}>
        <h1 className={classes.font_center}>
          공식문서 기반 기술 질문을 <br />
          메일로 받아보세요!
        </h1>
        <TextButton
          text="로그인"
          size="h2"
          p="l"
          br="8"
          width={"250px"}
          onClick={handleLoginClick}
        />
        <TextButton
          text="회원가입"
          theme="gray"
          size="h2"
          p="l"
          br="8"
          width={"250px"}
          onClick={handleSignUpClick}
        />
      </section>
    </>
  );
};

export default MainPage;
