import React from "react";
import Markdown from "react-markdown";

import classes from "./QuestionPage.module.scss";

const QuestionPage = () => {
  const mdFile = `
  A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.
### sdf
* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

  return (
    <div className={classes.page_wrap}>
      <Markdown>{mdFile}</Markdown>
    </div>
  );
};

export default QuestionPage;
