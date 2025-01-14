import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

import BookmarkIcon from "assets/images/icons/BookmarkIcon";

import useGetArticle from "apis/article_apis/useGetArticle";
import { useAddBookmark } from "apis/bookmark_apis/useAddBookmark";
import { useGetBookmarkList } from "apis/bookmark_apis/useBookmark";
import { useDeleteBookmark } from "apis/bookmark_apis/useDeleteBookmark";

import BaseButton from "components/buttons/base_button/BaseButton";

import classes from "./ArticlePage.module.scss";

const ArticlePage = () => {
  const articleId = useParams().articleId;

  const { data: articleData } = useGetArticle({
    articleId: Number(articleId),
  });

  const { data: bookmarkListData } = useGetBookmarkList(1, 1);

  const isBookmark =
    bookmarkListData.items.filter(
      (item) => item.article.id === Number(articleId),
    ).length > 0;

  const { mutate: addBookmarkMutate } = useAddBookmark();
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();

  const handleBookmarkClick = () => {
    if (isBookmark) {
      const bookmarkId = bookmarkListData.items.filter(
        (item) => item.article.id === Number(articleId),
      )[0].bookmarkId;

      deleteBookmarkMutate({ bookmarkId });
    } else {
      addBookmarkMutate({ articleId: Number(articleId) });
    }
  };

  return (
    <div className={classes.page_wrap}>
      <main className={classes.content_wrap}>
        {/* 북마크 추가 / 해제 버튼 */}
        <BaseButton theme="none" p="none" onClick={handleBookmarkClick}>
          <BookmarkIcon isFill={isBookmark} />
        </BaseButton>
        {/* 아티클 */}
        <article className={classes.article_wrap}>
          <Markdown>{articleData}</Markdown>
        </article>
      </main>
    </div>
  );
};

export default ArticlePage;
