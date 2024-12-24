import React from "react";

import Logo from "assets/images/logos/LogoIcon";

import BaseButton from "components/buttons/base_button/BaseButton";
import TextButton from "components/buttons/text_button/TextButton";

import classes from "./MainHeader.module.scss";

const MainHeader = () => {
  return (
    <header className={classes.header_wrap}>
      {/* 왼쪽의 로고 버튼 */}
      <BaseButton type="button" theme="none" onClick={() => {}}>
        <div className={classes.logo_button_wrap}>
          <Logo />
          <span>구DOC</span>
        </div>
      </BaseButton>
      {/* 오른쪽 로그인 버튼 */}
      <TextButton text="로그인" size="large" />
    </header>
  );
};

export default MainHeader;
