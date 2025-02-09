import { useParams } from "react-router-dom";

import BookmarkIcon from "assets/images/icons/BookmarkIcon";

import { useAddBookmark } from "apis/bookmark_apis/useAddBookmark";
import { useGetBookmarkList } from "apis/bookmark_apis/useBookmark";
import { useDeleteBookmark } from "apis/bookmark_apis/useDeleteBookmark";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./ArticleToolBar.module.scss";

const ArticleToolBar = () => {
  const articleId = useParams().articleId;

  const { data: bookmarkListData } = useGetBookmarkList(1, 1);
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: addBookmarkMutate } = useAddBookmark();

  const isBookmark = Array.isArray(bookmarkListData?.data?.items)
    ? bookmarkListData.data.items.filter(
        (item) => item.article.id === Number(articleId),
      ).length > 0
    : false;

  const handleBookmarkClick = () => {
    if (isBookmark) {
      const bookmarkId = bookmarkListData.data.items.filter(
        (item) => item.article.id === Number(articleId),
      )[0].bookmarkId;
      deleteBookmarkMutate({ bookmarkId });
    } else {
      addBookmarkMutate({ articleId: Number(articleId) });
    }
  };
  return (
    <section className={classes.tool_wrap}>
      <BaseButton
        theme="none"
        p="none"
        onClick={handleBookmarkClick}
        title="북마크 추가/해제"
      >
        <BookmarkIcon width={20} height={20} isFill={isBookmark} />
      </BaseButton>
    </section>
  );
};

export default ArticleToolBar;
