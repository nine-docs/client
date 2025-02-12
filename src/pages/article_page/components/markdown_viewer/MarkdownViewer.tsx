import Markdown from "react-markdown";

import classes from "./MarkdownViewer.module.scss";

const MarkdownViewer = ({
  title,
  markdown,
}: {
  title: string;
  markdown: string | null;
}) => {
  return (
    <article className={classes.markdown_wrap}>
      <h3>{title}</h3>
      <Markdown>{markdown}</Markdown>
    </article>
  );
};

export default MarkdownViewer;
