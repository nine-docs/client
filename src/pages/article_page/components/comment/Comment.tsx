import { useGetComment } from "apis/article_apis/useGetComment";

import TextButton from "components/buttons/text_button/TextButton";

import classes from "./Comment.module.scss";
import CommentItem from "./components/comment_item/CommentItem";
import ReplyInput from "./components/reply_input/ReplyInput";

const Comment = ({ articleId }: { articleId: string }) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetComment(Number(articleId));

  return (
    <section className={classes.comment_wrap}>
      <div className={classes.comment_list}>
        <ReplyInput />
        {!isLoading &&
          !isError &&
          !!data &&
          data.pages.map((page) =>
            page.data.items.map((commentItem: CommentItemType) => (
              <CommentItem
                key={commentItem.commentId}
                commentItem={commentItem}
              />
            )),
          )}
        {hasNextPage && (
          <TextButton
            onClick={() => {
              fetchNextPage();
            }}
            text="더보기"
            width={"100%"}
            theme="primary-line"
          />
        )}
      </div>
    </section>
  );
};

export default Comment;
