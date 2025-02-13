import { useGetComment } from "apis/comment_apis/useGetComment";

import TextButton from "components/buttons/text_button/TextButton";

import classes from "./Comment.module.scss";
import CommentInput from "./components/comment_input/CommentInput";
import CommentItem from "./components/comment_item/CommentItem";

const Comment = ({ articleId }: { articleId: string }) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetComment(Number(articleId));

  return (
    <section className={classes.comment_wrap}>
      <CommentInput />
      <div className={classes.comment_list}>
        {!isLoading && data?.pages[0].data.items.length === 0 && (
          <div className={classes.no_comment}>아직 댓글이 없습니다.</div>
        )}
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
