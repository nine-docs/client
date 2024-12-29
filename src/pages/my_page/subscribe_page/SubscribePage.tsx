import React from "react";

import classes from "./SubscribePage.module.scss";
import SubscribeCategoryList from "./components/category_list/SubscribeCategoryList";

const SubscribePage = () => {
  return (
    <main className={classes.content_wrap}>
      <section className={classes.section_wrap}>
        <h3>구독 카테고리</h3>
        <SubscribeCategoryList />
      </section>
    </main>
  );
};

export default SubscribePage;
