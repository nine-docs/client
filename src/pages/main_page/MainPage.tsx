import { useNavigate } from "react-router-dom";

import TextButton from "components/buttons/text_button/TextButton";

import classes from "./MainPage.module.scss";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <>
      {/* 첫번째 소개 Section */}
      <section className={classes.first_section}>
        <h1 className={classes.font_center}>
          기술 면접 질문을 매일매일 <br />
          메일로 보내드릴게요!
        </h1>
        <h3 className={`${classes.font_label} ${classes.font_center}`}>
          따로 시간 내지 않아도, <br />
          지하철에서 하나씩 읽다보면 면접
          <br />
          걱정이 사라질 거예요.
        </h3>
        <TextButton
          text="로그인"
          size="h2"
          p="l"
          br="8"
          width={"250px"}
          onClick={handleSignUpClick}
        />
        <TextButton
          text="회원가입"
          theme="gray"
          size="h2"
          p="l"
          br="8"
          width={"250px"}
          onClick={handleSignInClick}
        />
      </section>
    </>
  );
};

export default MainPage;
