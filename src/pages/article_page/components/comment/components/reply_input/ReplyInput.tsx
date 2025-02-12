import { FieldErrors, FormProvider, useForm } from "react-hook-form";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import classes from "./ReplyInput.module.scss";

type FormValues = {
  comment: string;
};

const ReplyInput = () => {
  const initialFormValue = {
    comment: "",
  };

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValue,
  });

  return (
    <FormProvider {...methods}>
      <div className={classes.reply_input_wrap}>
        <div className={classes.input_wrap}>
          <BaseInput
            type="text"
            registerName="comment"
            registerOption={{
              required: "댓글을 입력해 주세요.",
              maxLength: {
                value: 100,
                message: "100자 이내로 작성해 주세요.",
              },
            }}
            placeholder="댓글을 입력해 주세요."
            inputStyle={{
              height: "25px",
            }}
          />
        </div>
        <TextButton text="등록하기" p={"s"} />
      </div>
    </FormProvider>
  );
};

export default ReplyInput;
