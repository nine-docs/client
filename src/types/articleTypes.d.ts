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
