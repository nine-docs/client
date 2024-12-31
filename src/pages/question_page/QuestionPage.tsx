import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

import useGetArticle from "apis/article_apis/useGetArticle";

import classes from "./QuestionPage.module.scss";

const QuestionPage = () => {
  const articleId = useParams().articleId;

  const { data } = useGetArticle({
    articleId: Number(articleId),
  });

  return (
    <div className={classes.page_wrap}>
      {/* 문제 section */}
      <section className={classes.section_wrap}>
        <h2 className={classes.section_title}>Q.</h2>
        <article className={classes.question_wrap}>{data.ArticleTitle}</article>
      </section>
      {/* 답안 section */}
      <section className={classes.section_wrap}>
        <h2 className={classes.section_title}>A.</h2>
        <article className={classes.answer_wrap}>
          <Markdown>{data.ArticleContents}</Markdown>
        </article>
      </section>
    </div>
  );
};

export default QuestionPage;
