import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useAddComment from "apis/comment_apis/useAddComment";

import TextButton from "components/buttons/text_button/TextButton";
import BaseInput from "components/inputs/base_input/BaseInput";

import useIsLogin from "hooks/useIsLogin";

import classes from "./CommentInput.module.scss";

type FormValues = {
  comment: string;
};

const CommentInput = () => {
  const articleId = useParams().articleId;
  const { isLogin } = useIsLogin();

  const initialFormValue = {
    comment: "",
  };

  const methods = useForm<FormValues>({
    mode: "all",
    defaultValues: initialFormValue,
  });

  const { mutate } = useAddComment();

  const onSubmit = (data: FormValues) => {
    mutate(
      { content: data.comment, articleId: Number(articleId) },
      {
        onSuccess: () => {
          methods.reset();
        },
      },
    );
  };

  const onError = (e: FieldErrors) => {
    if (e?.comment?.message && typeof e?.comment?.message === "string") {
      toast.error(e.comment.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form className={classes.reply_input_wrap}>
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
        <TextButton
          type="button"
          text="등록하기"
          p={"s"}
          size="small"
          onClick={(e?: React.MouseEvent<HTMLButtonElement>) => {
            e && e.preventDefault();
            if (!isLogin) {
              toast.error("로그인이 필요합니다.");
              return;
            }
            methods.handleSubmit(onSubmit, onError)();
          }}
        />
      </form>
    </FormProvider>
  );
};

export default CommentInput;
