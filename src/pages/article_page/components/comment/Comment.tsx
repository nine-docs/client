import { useGetComments } from "apis/article_apis/useGetComments";

import classes from "./Comment.module.scss";
import CommentItem from "./components/comment_item/CommentItem";
import ReplyInput from "./components/reply_input/ReplyInput";

const Comment = ({ articleId }: { articleId: string }) => {
  const { data } = useGetComments(Number(articleId), null, 10);

  return (
    <section className={classes.comment_wrap}>
      <ReplyInput />
      <div className={classes.comment_list}>
        {data.data.items.map((commentItem) => {
          return (
            <CommentItem
              key={commentItem.commentId}
              commentItem={commentItem}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Comment;
