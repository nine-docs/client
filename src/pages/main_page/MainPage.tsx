import React from "react";

import TextButton from "components/buttons/text_button/TextButton";
import MainHeader from "components/headers/main_header/MainHeader";

import classes from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <>
      <MainHeader />
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
        <TextButton text="무료 구독하기" size="h1" p="xl" br="20" />
      </section>
    </>
  );
};

export default MainPage;
