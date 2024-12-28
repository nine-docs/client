import React from "react";

import classes from "./SideNav.module.scss";
import SideNavItem from "./item/SideNavItem";

const SideNav = () => {
  const navList = [
    { title: "구독 관리", path: "mypage/subscribe" },
    { title: "북마크", path: "mypage/bookmark" },
    { title: "알림", path: "mypage/alarm" },
  ];

  return (
    <nav className={classes.nav_wrap}>
      {navList.map((navItem, index) => {
        return (
          <SideNavItem key={index} title={navItem.title} path={navItem.path} />
        );
      })}
    </nav>
  );
};

export default SideNav;
