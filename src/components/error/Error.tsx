import ErrorIcon from "assets/images/icons/ErrorIcon";

import classes from "./Error.module.scss";

export default function Error() {
  return (
    <div className={classes.error_wrap}>
      <ErrorIcon width={24} height={24} />
      <p>에러가 발생했습니다.</p>
    </div>
  );
}
