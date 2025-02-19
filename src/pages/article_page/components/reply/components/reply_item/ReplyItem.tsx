import dayjs from "dayjs";
import { useParams } from "react-router-dom";

import DeleteIcon from "assets/images/icons/DeleteIcon";
import EditIcon from "assets/images/icons/EditIcon";
import ReplyIcon from "assets/images/icons/ReplyIcon";

import useDeleteReply from "apis/comment_apis/useDeleteReply";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./ReplyItem.module.scss";

const ReplyItem = ({
  replyItem,
  commentId,
}: {
  replyItem: ReplyItemType;
  commentId: number;
}) => {
  const articleId = useParams().articleId;

  const { mutate } = useDeleteReply();

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
              <BaseButton theme="none" title="대댓글 수정하기" p="none">
                <EditIcon width={14} height={14} />
              </BaseButton>
            </>
          )}
        </div>
        <div>{replyItem.content}</div>
      </div>
    </div>
  );
};
export default ReplyItem;
