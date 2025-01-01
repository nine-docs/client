import React from "react";

import { useGetBookmarkList } from "apis/mypage_apis/useBookmark";

import classes from "./BookmarkPage.module.scss";

const BookmarkPage = () => {
  const { data } = useGetBookmarkList(1, 10);

  const handleItemClick = () => {};

  return (
    <main className={classes.content_wrap}>
      <h3>북마크 목록</h3>

      <section className={classes.list_wrap}>
        {data.items.map((item) => (
          <button
            key={item.bookmarkId}
            className={classes.item_wrap}
            onClick={handleItemClick}
          >
            <span className={classes.category}>
              {item.article.category.name}
            </span>
            <h4>{item.article.title}</h4>
          </button>
        ))}
      </section>
    </main>
  );
};

export default BookmarkPage;
