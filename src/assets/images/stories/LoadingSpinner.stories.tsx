import Lottie from "react-lottie-player";

import loading_spinner from "assets/images/lottie/loading_spinner.json";

const LoadingSpinner = () => {
  return (
    <Lottie
      loop
      play
      animationData={loading_spinner}
      style={{ width: 150, height: 150 }}
    />
  );
};

export default {
  title: "assets/images/lottie/LoadingSpinner",
  component: LoadingSpinner,
};

export const Default = {};
