import {
  FieldErrors,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { toast } from "react-toastify";

import TextButton from "components/buttons/text_button/TextButton";
import BaseTextarea from "components/inputs/base_textarea/BaseTextarea";

import classes from "./EditComment.module.scss";

const EditComment = ({ commentItem }: { commentItem: CommentItemType }) => {
  const methods = useForm({
    mode: "all",
    defaultValues: {
      content: commentItem.content,
    },
  });

  const onSubmit = () => {};

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
