import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useUpdateComment from "apis/comment_apis/useUpdateComment";

import TextButton from "components/buttons/text_button/TextButton";
import BaseTextarea from "components/inputs/base_textarea/BaseTextarea";

import classes from "./EditComment.module.scss";

const EditComment = ({
  commentItem,
  onClose,
}: {
  commentItem: CommentItemType;
  onClose: () => void;
}) => {
  const articleId = useParams().articleId;

  const methods = useForm({
    mode: "all",
    defaultValues: {
      content: commentItem.content,
    },
  });

  const { mutate } = useUpdateComment();

  const onSubmit = (data: { content: string }) => {
    mutate(
      {
        articleId: Number(articleId),
        content: data.content,
        commentId: commentItem.commentId,
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

export default EditComment;
