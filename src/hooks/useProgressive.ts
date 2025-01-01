import { useEffect, useState } from "react";

const MOBILE_WIDTH = 600;
const TABLET_WIDTH = 900;

const useProgressive: () => {
  viewType: "mobile" | "tablet" | "desktop";
} = () => {
  const [viewType, setViewType] = useState(getViewType(window.innerWidth));

  function getViewType(width: number): "mobile" | "tablet" | "desktop" {
    if (width < MOBILE_WIDTH) {
      return "mobile";
    } else if (width < TABLET_WIDTH) {
      return "tablet";
    } else {
      return "desktop";
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setViewType(getViewType(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    viewType,
  };
};

export default useProgressive;
