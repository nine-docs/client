import React from "react";
import { useNavigate } from "react-router-dom";

import { useGetBookmarkList } from "apis/bookmark_apis/useBookmarkList";

import classes from "./BookmarkPage.module.scss";
import BookmarkItem from "./components/bookmark_item/BookmarkItem";

const BookmarkPage = () => {
  const navigate = useNavigate();

  const { data } = useGetBookmarkList(1, 10);

  const handleItemClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <main className={classes.content_wrap}>
      <section className={classes.list_wrap}>
        {data.data.items.map((item) => (
          <BookmarkItem
            key={item.bookmarkId}
            item={item}
            onClick={() => {
              handleItemClick(item.article.id);
            }}
          />
        ))}
      </section>
    </main>
  );
};

export default BookmarkPage;
