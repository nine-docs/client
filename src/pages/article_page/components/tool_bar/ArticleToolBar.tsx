import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BookmarkIcon from "assets/images/icons/BookmarkIcon";

import { useAddBookmark } from "apis/bookmark_apis/useAddBookmark";
import { useDeleteBookmark } from "apis/bookmark_apis/useDeleteBookmark";
import useGetIsBookmark from "apis/bookmark_apis/useGetIsBookmark";

import BaseButton from "components/buttons/base_button/BaseButton";

import useIsLogin from "hooks/useIsLogin";

import classes from "./ArticleToolBar.module.scss";

const ArticleToolBar = () => {
  const articleId = useParams().articleId;

  const { isLogin } = useIsLogin();

  const { data: isBookmarkData } = useGetIsBookmark(Number(articleId));
  const { mutate: deleteBookmarkMutate } = useDeleteBookmark();
  const { mutate: addBookmarkMutate } = useAddBookmark();

  const isBookmark = isBookmarkData.data !== null;
  const bookmarkId = isBookmarkData.data?.bookmarkId || undefined;

  const handleBookmarkClick = () => {
    if (!isLogin) {
      toast.error("로그인이 필요합니다.");

      return;
    }
    if (isBookmark) {
      if (!!bookmarkId) {
        deleteBookmarkMutate({ bookmarkId });
      } else {
        toast.error("북마크 해제에 실패했습니다.");
      }
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
        title={isBookmark ? "북마크 해제" : "북마크 추가"}
      >
        <BookmarkIcon width={20} height={20} isFill={isBookmark} />
      </BaseButton>
    </section>
  );
};

export default ArticleToolBar;
