import React, { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";

import {
  useGetSubscribeCycleList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

import Checkbox from "components/inputs/checkbox/Checkbox";

import SubscribeFormLayout from "../layout/SubscribeFormLayout";
import classes from "./MailCycle.module.scss";

const MailCycle = () => {
  const { data: allSubscribeCycleListData } = useGetSubscribeCycleList();
  const { data: subscribeListData } = useGetSubscribeList();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      schedules: allSubscribeCycleListData.schedules.map((schedule) => {
        return {
          name: schedule,
          checked: false,
        };
      }),
    },
  });

  const { fields } = useFieldArray({
    control: methods.control,
    name: "schedules",
  });

  useEffect(() => {
    if (subscribeListData.mailReceivingSchedule.dayOfWeek.length > 0) {
      const updateSchedules = methods.getValues("schedules").map((schedule) => {
        return {
          name: schedule.name,
          checked: subscribeListData.mailReceivingSchedule.dayOfWeek.includes(
            schedule.name,
          ),
        };
      });

      methods.reset({
        schedules: updateSchedules,
      });
    }
  }, [methods, subscribeListData]);

  return (
    <FormProvider {...methods}>
      <SubscribeFormLayout title="메일 수신 주기 설정">
        <div className={classes.input_list_wrap}>
          {fields.map((field, index) => {
            return (
              <Controller
                key={field.id}
                control={methods.control}
                name={`schedules.${index}.checked`}
                render={({ field: renderField }) => {
                  return (
                    <Checkbox
                      ref={renderField.ref}
                      id={`schedules.${index}`}
                      name={field.name}
                      checked={renderField.value}
                      onChange={renderField.onChange}
                      onBlur={renderField.onBlur}
                    />
                  );
                }}
              />
            );
          })}
        </div>
      </SubscribeFormLayout>
    </FormProvider>
  );
};

export default MailCycle;
