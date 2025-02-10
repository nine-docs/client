import React from "react";

import classes from "./Nav.module.scss";
import NavItem from "./item/NavItem";

const Nav = () => {
  const navList = [
    { title: "구독 관리", path: "/mypage/subscribe" },
    { title: "북마크", path: "/mypage/bookmark" },
    // { title: "알람", path: "/mypage/alarm" },
  ];

  return (
    <nav className={classes.nav_wrap}>
      {navList.map((navItem, index) => {
        return (
          <NavItem key={index} title={navItem.title} path={navItem.path} />
        );
      })}
    </nav>
  );
};

export default Nav;
