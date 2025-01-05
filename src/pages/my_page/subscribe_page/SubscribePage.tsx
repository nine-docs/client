import React from "react";

import {
  useGetCategoryList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

import classes from "./SubscribePage.module.scss";
import SubscribeCategoryForm from "./components/category_list/SubscribeCategoryForm";
import MailCycle from "./components/mail_cycle/MailCycle";

const SubscribePage = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: subscribeListData } = useGetSubscribeList();

  return (
    <main className={classes.content_wrap}>
      {categoryListData.categories.length > 0 && <SubscribeCategoryForm />}
      <MailCycle />
    </main>
  );
};

export default SubscribePage;
