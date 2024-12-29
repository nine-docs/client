import Lottie from "react-lottie-player";

import loading_spinner from "assets/images/lottie/loading_spinner.json";

const LoadingSpinner = () => {
  return (
    <Lottie
      loop
      play
      animationData={loading_spinner}
      style={{ width: 100, height: 100 }}
    />
  );
};

export default {
  title: "assets/images/lottie/LoadingSpinner",
  component: LoadingSpinner,
};

export const Default = {};
