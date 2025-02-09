import classes from "./CommentItem.module.scss";

const CommentItem = ({ commentItem }: { commentItem: CommentItemType }) => {
  return (
    <article className={classes.item_wrap}>
      <p className={classes.nickname}>{commentItem.author.nickname}</p>
      <p className={classes.content}>{commentItem.content}</p>
    </article>
  );
};

export default CommentItem;
