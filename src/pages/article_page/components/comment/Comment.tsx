import { useEffect, useRef } from "react";

import { useGetComment } from "apis/comment_apis/useGetComment";

import classes from "./Comment.module.scss";
import CommentInput from "./components/comment_input/CommentInput";
import CommentItem from "./components/comment_item/CommentItem";

const Comment = ({ articleId }: { articleId: string }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useGetComment(Number(articleId));

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

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current);
    }

    return () => {
      if (observer.current && lastItemRef.current) {
        observer.current.unobserve(lastItemRef.current); // 컴포넌트 언마운트 시 관찰 종료
      }
    };
  }, [hasNextPage]);

  return (
    <section className={classes.comment_wrap}>
      <CommentInput />
      <div className={classes.comment_list}>
        {!isLoading && data?.pages[0].data.items.length === 0 && (
          <div className={classes.no_comment}>아직 댓글이 없습니다.</div>
        )}
        {!isLoading &&
          !isError &&
          !!data &&
          data.pages.map((page) =>
            page.data.items.map((commentItem: CommentItemType) => {
              return (
                <CommentItem
                  key={commentItem.commentId}
                  commentItem={commentItem}
                />
              );
            }),
          )}
      </div>
      <span ref={lastItemRef} />
    </section>
  );
};

export default Comment;
