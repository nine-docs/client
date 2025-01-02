import React from "react";

import {
  useGetCategoryList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

import classes from "./SubscribePage.module.scss";
import SubscribeCategoryForm from "./components/category_list/SubscribeCategoryForm";

const SubscribePage = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: subscribeListData } = useGetSubscribeList();

  return (
    <main className={classes.content_wrap}>
      <form className={classes.section_wrap}>
        {categoryListData.categories.length > 0 && <SubscribeCategoryForm />}
      </form>
    </main>
  );
};

export default SubscribePage;
