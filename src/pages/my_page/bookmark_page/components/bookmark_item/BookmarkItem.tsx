import React from "react";
import { toast } from "react-toastify";

import DeleteIcon from "assets/images/icons/DeleteIcon";

import { useDeleteBookmark } from "apis/mypage_apis/useBookmark";

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

const BookmarkItem: React.FC<BookmarkItemPropsType> = ({
  item,
  onClick = () => {},
}: BookmarkItemPropsType) => {
  const { mutateAsync } = useDeleteBookmark();

  const handleDeleteClick = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();

    try {
      await mutateAsync({ bookmarkId: item.bookmarkId });
    } catch (e) {}
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
      <BaseButton theme="gray-line" p="none" onClick={handleDeleteClick}>
        <div className={classes.icon_button}>
          <DeleteIcon width={14} height={14} />
        </div>
      </BaseButton>
    </button>
  );
};

export default BookmarkItem;
