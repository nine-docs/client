type CommentItemType = {
  commentId: number;
  author: {
    id: number;
    nickname: string;
  };
  reply: {
    count: number;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
};
