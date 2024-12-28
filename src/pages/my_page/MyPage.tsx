import { Outlet } from "react-router-dom";

import Nav from "components/nav/Nav";

import classes from "./MyPage.module.scss";

const MyPage = () => {
  return (
    <div className={classes.page_wrap}>
      <Nav />
      <Outlet />
    </div>
  );
};

export default MyPage;
