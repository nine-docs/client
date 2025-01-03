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

import classes from "./SubscribeCategoryForm.module.scss";

const SubscribeCategoryForm = () => {
  const { data: categoryListData } = useGetCategoryList();
  const { data: subscribeListData } = useGetSubscribeList();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      category: categoryListData.categories.map((category) => {
        return {
          ...category,
          checked: subscribeListData.categories
            .map((category) => category.id)
            .includes(category.id),
        };
      }),
    },
  });

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
          {fields.map((field, index) => {
            console.log(field);

            return (
              <Controller
                key={field.id}
                control={methods.control}
                name={`category.${index}.checked`}
                render={({ field: renderField }) => {
                  return (
                    <div className={classes.checkbox_wrap}>
                      <input
                        type="checkbox"
                        id={`category.${index}`}
                        checked={renderField.value}
                        onChange={(e) => {
                          renderField.onChange(e.target.checked);
                        }}
                        onBlur={renderField.onBlur}
                        ref={renderField.ref}
                      />
                      <label
                        htmlFor={`category.${index}`}
                        className={`${classes.label} ${renderField.value ? classes.isChecked : undefined}`}
                      >
                        <span
                          className={`${classes.checkbox} ${renderField.value ? classes.checkbox_checked : undefined}`}
                        />
                        <p>{field.name}</p>
                      </label>
                    </div>
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
