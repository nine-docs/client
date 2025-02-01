import React, { useEffect } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

import {
  useGetSubscribeCycleList,
  useGetSubscribeList,
  useUpdateSubscribeCycle,
} from "apis/mypage_apis/useSubscribe";

import Checkbox from "components/inputs/checkbox/Checkbox";

import SubscribeFormLayout from "../layout/SubscribeFormLayout";
import classes from "./MailCycle.module.scss";

const MailCycle = () => {
  const { data: allSubscribeCycleListData } = useGetSubscribeCycleList();
  const { data: subscribeListData, isError } = useGetSubscribeList();
  const { mutate } = useUpdateSubscribeCycle();

  const methods = useForm({
    mode: "all",
    defaultValues: {
      schedules: allSubscribeCycleListData.data.schedules.map((schedule) => {
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
    if (isError) return;

    if (subscribeListData.data.mailReceivingSchedule.dayOfWeeks.length > 0) {
      const updateSchedules = methods.getValues("schedules").map((schedule) => {
        return {
          name: schedule.name,
          checked:
            subscribeListData.data.mailReceivingSchedule.dayOfWeeks.includes(
              schedule.name,
            ),
        };
      });

      methods.reset({
        schedules: updateSchedules,
      });
    }
  }, [methods, subscribeListData, isError]);

  if (isError) return <div>Error</div>;

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
                      onChange={async (e) => {
                        const isChecked = e.target.checked;

                        methods.setValue(
                          `schedules.${index}.checked`,
                          isChecked,
                        );

                        mutate({
                          schedules: methods
                            .getValues("schedules")
                            .filter((schedule) => schedule.checked)
                            .map((schedule) => schedule.name),
                        });
                      }}
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
