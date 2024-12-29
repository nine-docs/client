import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "stores/authStore";

import Logo from "assets/images/logos/LogoIcon";

import BaseButton from "components/buttons/base_button/BaseButton";
import TextButton from "components/buttons/text_button/TextButton";

import classes from "./MainHeader.module.scss";

const MainHeader = () => {
  const navigate = useNavigate();

  const { token, deleteAuthInfo } = useAuthStore();

  const handleLogoClick = () => {
    navigate("/main");
  };

  const handleLogoutClick = () => {
    deleteAuthInfo();
    navigate("/main");
    toast.success("로그아웃 되었습니다.");
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
      {/* 로그인 되어 있는 경우 : 로그아웃 버튼 */}
      {token !== "" && (
        <TextButton
          text="로그아웃"
          p="s"
          size="small"
          onClick={handleLogoutClick}
        />
      )}
    </header>
  );
};

export default MainHeader;
