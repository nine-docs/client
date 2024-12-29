import { Route, Routes } from "react-router-dom";

import Nav from "components/nav/Nav";

import classes from "./MyPage.module.scss";
import AlarmPage from "./alarm_page/AlarmPage";
import BookmarkPage from "./bookmark_page/BookmarkPage";
import SubscribePage from "./subscribe_page/SubscribePage";

const MyPage = () => {
  return (
    <div className={classes.page_wrap}>
      <Nav />
      <div className={classes.content_wrap}>
        <Routes>
          <Route path="/bookmark" element={<BookmarkPage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="subscribe" element={<SubscribePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default MyPage;
