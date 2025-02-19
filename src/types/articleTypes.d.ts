type CommentItemType = {
  commentId: number;
  author: {
    id: number;
    nickname: string;
    isMe: boolean;
  };
  reply: {
    count: number;
  };
  content: string;
  like: {
    count: null | number;
    isUserLike: boolean;
  };
  createdAt: string;
  updatedAt: string;
};

type ReplyItemType = {
  replyId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    nickname: string;
    isMe: boolean;
  };
};
