import React, { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import {
  useGetSubscribeCycleList,
  useGetSubscribeList,
} from "apis/mypage_apis/useSubscribe";

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
          ...fields,
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
          {allSubscribeCycleListData.schedules.map((schedule) => {
            return <div>{schedule}</div>;
          })}
        </div>
      </SubscribeFormLayout>
    </FormProvider>
  );
};

export default MailCycle;
