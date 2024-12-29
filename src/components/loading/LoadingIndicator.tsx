import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import React from "react";
import Lottie from "react-lottie-player";

import loading_spinner from "assets/images/lottie/loading_spinner.json";

import classes from "./LoadingIndicator.module.scss";

const LoadingIndicator = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (isFetching > 0 || isMutating > 0) {
    return (
      <div className={classes.backdrop}>
        <Lottie
          loop
          play
          animationData={loading_spinner}
          style={{ width: 100, height: 100 }}
        />
      </div>
    );
  } else return null;
};

export default LoadingIndicator;
