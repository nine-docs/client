import dayjs from "dayjs";

import HeartIcon from "assets/images/icons/HeartIcon";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./CommentItem.module.scss";

const CommentItem = ({ commentItem }: { commentItem: CommentItemType }) => {
  const isMeLike = commentItem.like.isUserLike;

  const handleLikeClick = () => {};

  return (
    <article className={classes.item_wrap}>
      {/* 유저이름, 등록일시, 컨텐츠 */}
      <div className={classes.left_wrap}>
        {/* 유저이름, 등록일시 */}
        <div className={classes.first_line}>
          <p className={classes.nickname}>{commentItem.author.nickname}</p>
          <div className={classes.date_time}>
            {dayjs(commentItem.createdAt).format("YYYY-MM-DD A hh:mm")}
          </div>
        </div>
        {/* 컨텐츠 */}
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
          <HeartIcon width={18} height={16} isFilled={isMeLike} />
        </BaseButton>
        <span>{commentItem.like.count || 0}</span>
      </div>
    </article>
  );
};

export default CommentItem;
