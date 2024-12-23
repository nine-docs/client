import React from "react";

type LogoIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const Logo: React.FC<LogoIconProps> = ({
  width = 24,
  height = 24,
  color = "var(--color_brand01)",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 8L9.942 9.74C11.657 10.754 12.342 10.754 14.058 9.74L17 8"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.984 12.976C22.005 11.99 22.005 11.01 21.984 10.024C21.919 6.95899 21.886 5.42599 20.755 4.29099C19.624 3.15499 18.05 3.11599 14.901 3.03699C12.9673 2.9882 11.0327 2.9882 9.099 3.03699C5.95 3.11599 4.37599 3.15499 3.24499 4.29099C2.11399 5.42599 2.081 6.95899 2.015 10.024C1.99394 11.0079 1.99394 11.9921 2.015 12.976C2.081 16.041 2.11399 17.574 3.24499 18.709C4.37599 19.845 5.95 19.884 9.099 19.963C10.404 19.996 11.7 20.007 13 19.996"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18.5 14L18.758 14.697C19.096 15.611 19.265 16.068 19.598 16.401C19.932 16.735 20.389 16.904 21.303 17.242L22 17.5L21.303 17.758C20.389 18.096 19.932 18.265 19.599 18.598C19.265 18.932 19.096 19.389 18.758 20.303L18.5 21L18.242 20.303C17.904 19.389 17.735 18.932 17.402 18.599C17.068 18.265 16.611 18.096 15.697 17.758L15 17.5L15.697 17.242C16.611 16.904 17.068 16.735 17.401 16.402C17.735 16.068 17.904 15.611 18.242 14.697L18.5 14Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Logo;
