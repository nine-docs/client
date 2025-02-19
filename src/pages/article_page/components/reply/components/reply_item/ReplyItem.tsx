import dayjs from "dayjs";

import ReplyIcon from "assets/images/icons/ReplyIcon";

import classes from "./ReplyItem.module.scss";

const ReplyItem = ({ replyItem }: { replyItem: ReplyItemType }) => {
  return (
    <div className={classes.input_wrap}>
      <ReplyIcon />
      <div className={classes.input_right}>
        <div className={classes.input_head_info}>
          <div className={classes.user_name}>{replyItem.author.nickname}</div>
          <div className={classes.date_time}>
            {dayjs(replyItem.createdAt).format("YYYY-MM-DD A hh:mm")}
          </div>
        </div>
        <div>{replyItem.content}</div>
      </div>
    </div>
  );
};
export default ReplyItem;
