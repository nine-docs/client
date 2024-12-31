import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

import useGetArticle from "apis/article_apis/useGetArticle";

import classes from "./ArticlePage.module.scss";

const ArticlePage = () => {
  const articleId = useParams().articleId;

  const { data } = useGetArticle({
    articleId: Number(articleId),
  });

  return (
    <div className={classes.page_wrap}>
      <main className={classes.content_wrap}>
        <article className={classes.article_wrap}>
          <Markdown>{data}</Markdown>
        </article>
      </main>
    </div>
  );
};

export default ArticlePage;
