import { useParams } from "react-router-dom";

import BookmarkIcon from "assets/images/icons/BookmarkIcon";

import { useAddBookmark } from "apis/bookmark_apis/useAddBookmark";
import { useGetBookmarkList } from "apis/bookmark_apis/useBookmarkList";
import { useDeleteBookmark } from "apis/bookmark_apis/useDeleteBookmark";
import useGetIsBookmark from "apis/bookmark_apis/useGetIsBookmark";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./ArticleToolBar.module.scss";

const ArticleToolBar = () => {
  const articleId = useParams().articleId;

  const { data: isBookmarkData } = useGetIsBookmark(Number(articleId));
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: addBookmarkMutate } = useAddBookmark();

  const isBookmark = !isBookmarkData.data === null;
  const bookmarkId =
    !isBookmarkData.data === null ? isBookmarkData.data?.bookmarkId : undefined;

  const handleBookmarkClick = () => {
    if (isBookmark && !!bookmarkId) {
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
