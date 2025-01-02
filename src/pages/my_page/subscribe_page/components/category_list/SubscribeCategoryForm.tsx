import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import {
  useGetCategoryList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

const SubscribeCategoryForm = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: subscribeListData } = useGetSubscribeList();

  const methods = useForm({ mode: "all" });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control: methods.control,
      name: "category",
    },
  );

  return (
    <FormProvider {...methods}>
      <div>
        {categoryListData.categories.map((category) => {
          return <div key={category.id}>{category.name}</div>;
        })}
      </div>
    </FormProvider>
  );
};

export default SubscribeCategoryForm;
