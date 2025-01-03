import { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";

import {
  useGetCategoryList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

import Checkbox from "components/inputs/checkbox/Checkbox";

import classes from "./SubscribeCategoryForm.module.scss";

const SubscribeCategoryForm = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: subscribeListData } = useGetSubscribeList();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      category: categoryListData.categories.map((category) => {
        return {
          id: category.id,
          name: category.name,
          checked: false,
        };
      }),
    },
  });

  const { fields } = useFieldArray({
    control: methods.control,
    name: "category",
  });

  useEffect(() => {
    if (subscribeListData.categories.length > 0) {
      const updateCategory = methods.getValues("category").map((field) => {
        return {
          ...field,
          checked: subscribeListData.categories
            .map((category) => category.id)
            .includes(field.id),
        };
      });

      methods.reset({
        category: updateCategory,
      });
    }
  }, [methods, subscribeListData]);

  return (
    <FormProvider {...methods}>
      <form className={classes.section_wrap}>
        <h4>구독 카테고리</h4>
        <div className={classes.input_list_wrap}>
          {fields.map((field, index) => {
            return (
              <Controller
                key={field.id}
                control={methods.control}
                name={`category.${index}.checked`}
                render={({ field: renderField }) => {
                  return (
                    <Checkbox
                      ref={renderField.ref}
                      id={`category.${index}`}
                      name={field.name}
                      checked={renderField.value}
                      onChange={(e) => {
                        renderField.onChange(e.target.checked);
                      }}
                      onBlur={renderField.onBlur}
                    />
                  );
                }}
              />
            );
          })}
        </div>
      </form>
    </FormProvider>
  );
};

export default SubscribeCategoryForm;
