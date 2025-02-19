import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import useGetReply from "apis/comment_apis/useGetReply";

import classes from "./Reply.module.scss";
import ReplyInput from "./components/reply_input/ReplyInput";
import ReplyItem from "./components/reply_item/ReplyItem";

const Reply = ({ commentItem }: { commentItem: CommentItemType }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const articleId = useParams().articleId;

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetReply(
    Number(articleId),
    commentItem.commentId,
  );

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    const options: IntersectionObserverInit = {
      root: null, // 뷰포트를 기준으로 감지
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    const lastItem = lastItemRef.current; // ref 값을 로컬 변수로 저장

    if (lastItem) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current && lastItem) {
        observer.current.unobserve(lastItem); // 컴포넌트 언마운트 시 관찰 종료
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className={classes.reply_wrap}>
      {!isLoading && data?.pages[0].data.items.length === 0 && (
        <div className={classes.no_reply}>답글이 없습니다.</div>
      )}
      {!isLoading &&
        !isError &&
        !!data &&
        data.pages.map((page) =>
          page.data.items.map((replyItem: ReplyItemType) => {
            return <ReplyItem key={replyItem.replyId} replyItem={replyItem} />;
          }),
        )}
      <span ref={lastItemRef} />
      <ReplyInput commentId={commentItem.commentId} />
    </div>
  );
};

export default Reply;
