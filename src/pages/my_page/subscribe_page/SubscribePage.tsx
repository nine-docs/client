import {
  useGetCategoryList,
  useGetSubscribeCycleList,
} from "apis/mypage_apis/useSubscribe";

import classes from "./SubscribePage.module.scss";
import SubscribeCategoryForm from "./components/category_list/SubscribeCategoryForm";
import MailCycle from "./components/mail_cycle/MailCycle";

const SubscribePage = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: allSubscribeCycleListData } = useGetSubscribeCycleList();

  return (
    <main className={classes.content_wrap}>
      {categoryListData.data.categories.length > 0 && <SubscribeCategoryForm />}
      {allSubscribeCycleListData.data.schedules.length > 0 && <MailCycle />}
    </main>
  );
};

export default SubscribePage;
