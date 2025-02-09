import { useParams } from "react-router-dom";

import useGetArticle from "apis/article_apis/useGetArticle";

import classes from "./ArticlePage.module.scss";
import Comment from "./components/comment/Comment";
import MarkdownViewer from "./components/markdown_viewer/MarkdownViewer";
import ArticleToolBar from "./components/tool_bar/ArticleToolBar";

const ArticlePage = () => {
  const articleId = useParams().articleId;

  const { data: articleData } = useGetArticle({
    articleId: Number(articleId),
  });

  if (!articleId) return null;

  return (
    <div className={classes.page_wrap}>
      <main className={classes.content_wrap}>
        <ArticleToolBar />
        <MarkdownViewer markdown={articleData.data} />
        <Comment articleId={articleId} />
      </main>
    </div>
  );
};

export default ArticlePage;
