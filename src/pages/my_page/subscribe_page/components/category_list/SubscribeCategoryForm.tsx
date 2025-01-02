import React from "react";

import {
  useGetCategoryList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

const SubscribeCategoryForm = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: subscribeListData } = useGetSubscribeList();

  return (
    <div>
      {categoryListData.categories.map((category) => {
        return <div key={category.id}>{category.name}</div>;
      })}
    </div>
  );
};

export default SubscribeCategoryForm;
