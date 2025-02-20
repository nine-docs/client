import dayjs from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";

import DeleteIcon from "assets/images/icons/DeleteIcon";
import EditIcon from "assets/images/icons/EditIcon";
import HeartIcon from "assets/images/icons/HeartIcon";
import ReplyIcon from "assets/images/icons/ReplyIcon";

import useDeleteReply from "apis/comment_apis/useDeleteReply";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./ReplyItem.module.scss";
import EditReply from "./edit_reply/EditReply";

const ReplyItem = ({
  replyItem,
  commentId,
}: {
  replyItem: ReplyItemType;
  commentId: number;
}) => {
  const articleId = useParams().articleId;

  const [isEditMode, setIsEditMode] = useState(false);

  const { mutate } = useDeleteReply();

  const handleEditClick = () => {
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteClick = () => {
    mutate({
      articleId: Number(articleId),
      commentId: commentId,
      replyId: replyItem.replyId,
    });
  };

  return (
    <div className={classes.input_wrap}>
      <ReplyIcon />

      <div className={classes.input_right}>
        <div className={classes.input_head_info}>
          <div className={classes.user_name}>{replyItem.author.nickname}</div>
          <div className={classes.date_time}>
            {dayjs(replyItem.createdAt).format("YYYY-MM-DD A hh:mm")}
          </div>
          {replyItem.author.isMe && (
            <>
              <BaseButton
                theme="none"
                title="대댓글 삭제하기"
                p="none"
                onClick={handleDeleteClick}
              >
                <DeleteIcon width={14} height={14} />
              </BaseButton>
              <BaseButton
                theme="none"
                title="대댓글 수정하기"
                p="none"
                onClick={handleEditClick}
              >
                <EditIcon width={14} height={14} />
              </BaseButton>
            </>
          )}
        </div>
        {!isEditMode && <div>{replyItem.content}</div>}
        {isEditMode && (
          <EditReply
            articleId={Number(articleId)}
            commentId={commentId}
            replyItem={replyItem}
            onClose={() => {
              setIsEditMode(false);
            }}
          />
        )}
      </div>

      <div className={classes.like_wrap}>
        <BaseButton theme="none" p="none" onClick={() => {}} br={"8"}>
          <HeartIcon
            width={18}
            height={16}
            isFilled={replyItem.like.isUserLike}
          />
        </BaseButton>
        <span>{replyItem.like.count || 0}</span>
      </div>
    </div>
  );
};
export default ReplyItem;
