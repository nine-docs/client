import { useLocation, useNavigate } from "react-router-dom";

import Logo from "assets/images/logos/LogoIcon";

import BaseButton from "components/buttons/base_button/BaseButton";
import TextButton from "components/buttons/text_button/TextButton";

import classes from "./MainHeader.module.scss";

const MainHeader = () => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const isLogin = false;
  const isLoginPage = pathname === "/signin";

  const handleLogoClick = () => {
    navigate("/main");
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };

  return (
    <header className={classes.header_wrap}>
      {/* 왼쪽의 로고 버튼 */}
      <BaseButton type="button" theme="none" onClick={handleLogoClick}>
        <div className={classes.logo_button_wrap}>
          <Logo />
          <span>구DOCs</span>
        </div>
      </BaseButton>
      {/* 오른쪽 로그인 버튼 */}
      {!isLogin && !isLoginPage && (
        <TextButton text="로그인" size="large" onClick={handleLoginClick} />
      )}
    </header>
  );
};

export default MainHeader;
