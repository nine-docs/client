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
  useUpdateSubscribe,
} from "apis/mypage_apis/useSubscribe";

import Error from "components/error/Error";
import Checkbox from "components/inputs/checkbox/Checkbox";

import SubscribeFormLayout from "pages/my_page/subscribe_page/components/layout/SubscribeFormLayout";

import classes from "./SubscribeCategoryForm.module.scss";

const SubscribeCategoryForm = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: subscribeListData, isError } = useGetSubscribeList();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      category: categoryListData.data.categories.map((category) => {
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

  const { mutate } = useUpdateSubscribe();

  useEffect(() => {
    if (
      Array.isArray(subscribeListData?.data?.categories) &&
      subscribeListData?.data?.categories?.length > 0
    ) {
      const updateCategory = methods.getValues("category").map((field) => {
        return {
          ...field,
          checked: subscribeListData.data.categories
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
      <SubscribeFormLayout title={"구독 카테고리"}>
        <div className={classes.input_list_wrap}>
          {isError ? (
            <Error />
          ) : (
            fields.map((field, index) => {
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
                        onChange={async (e) => {
                          const isChecked = e.target.checked;
                          methods.setValue(
                            `category.${index}.checked`,
                            isChecked,
                          );

                          const categoryIds = methods
                            .getValues("category")
                            .filter((category) => category.checked)
                            .map((category) => {
                              return category.id;
                            });

                          mutate({ categoryIds: categoryIds });
                        }}
                        onBlur={renderField.onBlur}
                      />
                    );
                  }}
                />
              );
            })
          )}
        </div>
      </SubscribeFormLayout>
    </FormProvider>
  );
};

export default SubscribeCategoryForm;
