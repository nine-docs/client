import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import useUpdateReply from "apis/comment_apis/useUpdateReply";

import TextButton from "components/buttons/text_button/TextButton";
import BaseTextarea from "components/inputs/base_textarea/BaseTextarea";

import classes from "./EditReply.module.scss";

const EditReply = ({
  articleId,
  commentId,
  replyItem,
  onClose,
}: {
  articleId: number;
  commentId: number;
  replyItem: ReplyItemType;
  onClose: () => void;
}) => {
  const methods = useForm({
    mode: "all",
    defaultValues: {
      content: replyItem.content,
    },
  });

  const { mutate } = useUpdateReply();

  const onSubmit = (data: { content: string }) => {
    mutate(
      {
        articleId: articleId,
        commentId: commentId,
        replyId: replyItem.replyId,
        content: data.content,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  const onError = (e: FieldErrors) => {
    if (e?.content?.message && typeof e?.content?.message === "string") {
      toast.error(e.content.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={classes.edit_mode_content}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        <BaseTextarea
          registerName="content"
          registerOption={{ required: "내용을 입력해 주세요." }}
          placeholder="내용을 입력해 주세요."
          style={{ height: "60px" }}
        />
        <TextButton
          theme="primary-line"
          type="submit"
          title="댓글 수정하기"
          text="수정하기"
          size="small"
          p="s"
        />
      </form>
    </FormProvider>
  );
};

export default EditReply;
