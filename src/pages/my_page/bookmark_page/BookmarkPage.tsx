import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import useGetBookmark from "apis/bookmark_apis/useGetBookmark";

import classes from "./BookmarkPage.module.scss";
import BookmarkItem from "./components/bookmark_item/BookmarkItem";

const BookmarkPage = () => {
  const navigate = useNavigate();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, hasNextPage } = useGetBookmark();

  const handleItemClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    const options: IntersectionObserverInit = {
      root: null,
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
    <main className={classes.content_wrap}>
      <section className={classes.list_wrap}>
        {!isLoading && data?.pages[0].data.items.length === 0 && (
          <div className={classes.error_wrap}>북마크된 문제가 없습니다.</div>
        )}
        {data?.pages.map((page) =>
          page.data.items.map((bookmarkItem) => {
            return (
              <BookmarkItem
                key={bookmarkItem.bookmarkId}
                item={bookmarkItem}
                onClick={() => {
                  handleItemClick(bookmarkItem.article.id);
                }}
              />
            );
          }),
        )}
        <span ref={lastItemRef} />
      </section>
    </main>
  );
};

export default BookmarkPage;
