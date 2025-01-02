import React from "react";

import classes from "./SubscribePage.module.scss";
import SubscribeCategoryForm from "./components/category_list/SubscribeCategoryForm";

const SubscribePage = () => {
  return (
    <main className={classes.content_wrap}>
      <form className={classes.section_wrap}>
        <SubscribeCategoryForm />
      </form>
    </main>
  );
};

export default SubscribePage;
