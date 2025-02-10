import HeartIcon from "assets/images/icons/HeartIcon";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./CommentItem.module.scss";

const CommentItem = ({ commentItem }: { commentItem: CommentItemType }) => {
  const handleLikeClick = () => {};

  return (
    <article className={classes.item_wrap}>
      {/* 유저이름, 컨텐츠 */}
      <div className={classes.left_wrap}>
        <div className={classes.first_line}>
          <p className={classes.nickname}>{commentItem.author.nickname}</p>
        </div>
        <p className={classes.content}>{commentItem.content}</p>
      </div>
      {/* 좋아요 버튼, 개수 표시 */}
      <div className={classes.like_wrap}>
        <BaseButton
          theme="none"
          p="none"
          onClick={handleLikeClick}
          br={"8"}
          title="좋아요"
        >
          <HeartIcon
            width={18}
            height={16}
            isFilled={commentItem.like.isUserLike}
          />
        </BaseButton>
        <span>{commentItem.like.count || 0}</span>
      </div>
    </article>
  );
};

export default CommentItem;
