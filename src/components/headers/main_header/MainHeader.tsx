import { useNavigate } from "react-router-dom";

import Logo from "assets/images/logos/LogoIcon";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./MainHeader.module.scss";

const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/main");
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
    </header>
  );
};

export default MainHeader;
