import React from "react";

import DeleteIcon from "assets/images/icons/DeleteIcon";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./BookmarkItem.module.scss";

type ArticleType = {
  id: number;
  title: string;
  category: {
    id: number;
    name: string;
  };
};

type BookmarkItemType = {
  bookmarkId: number;
  article: ArticleType;
};

type BookmarkItemPropsType = {
  item: BookmarkItemType;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const BookmarkItem = ({ item, onClick = () => {} }: BookmarkItemPropsType) => {
  const handleDeleteClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!!e) {
      e.stopPropagation();
    }
  };

  return (
    <button
      key={item.bookmarkId}
      className={classes.item_wrap}
      onClick={onClick}
    >
      <div className={classes.item_info_wrap}>
        <span className={classes.category}>{item.article.category.name}</span>
        <h4 className={classes.title}>{item.article.title}</h4>
      </div>
      <BaseButton theme="none" onClick={handleDeleteClick}>
        <DeleteIcon width={20} height={20} />
      </BaseButton>
    </button>
  );
};

export default BookmarkItem;
