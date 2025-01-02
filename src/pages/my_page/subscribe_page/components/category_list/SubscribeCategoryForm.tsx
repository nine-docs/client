import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import {
  useGetCategoryList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

import classes from "./SubscribeCategoryForm.module.scss";

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
      <form className={classes.section_wrap}>
        <h4>구독 카테고리</h4>
        <div className={classes.input_list_wrap}>
          {categoryListData.categories.map((category) => {
            return (
              <div key={category.id} className={classes.checkbox_wrap}>
                <input type="checkbox" id={`category_${category.id}`} />
                <label htmlFor={`category_${category.id}`}>
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </form>
    </FormProvider>
  );
};

export default SubscribeCategoryForm;
