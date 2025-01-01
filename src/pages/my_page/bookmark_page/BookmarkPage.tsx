import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetBookmarkList } from "apis/mypage_apis/useBookmark";

import classes from "./BookmarkPage.module.scss";

const BookmarkPage = () => {
  const navigate = useNavigate();

  const { data } = useGetBookmarkList(1, 10);

  const handleItemClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <main className={classes.content_wrap}>
      <h3>북마크 목록</h3>

      <section className={classes.list_wrap}>
        {data.items.map((item) => (
          <button
            key={item.bookmarkId}
            className={classes.item_wrap}
            onClick={() => {
              handleItemClick(item.article.id);
            }}
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
