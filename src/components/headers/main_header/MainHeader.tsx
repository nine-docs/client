import React from "react";

import Logo from "assets/images/logos/LogoIcon";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./MainHeader.module.scss";

const MainHeader = () => {
  return (
    <header>
      {/* 왼쪽의 로고 버튼 */}
      <BaseButton type="button" theme="none" onClick={() => {}}>
        <div className={classes.Logo_Button_wrap}>
          <Logo />
          <span>구DOC</span>
        </div>
      </BaseButton>
    </header>
  );
};

export default MainHeader;
