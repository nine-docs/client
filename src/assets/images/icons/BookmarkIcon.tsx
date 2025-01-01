import React from "react";

type BookmarkIconProps = {
  width?: number;
  height?: number;
  color?: string;
  isFill?: boolean;
  fillColor?: string;
};

const BookmarkIcon: React.FC<BookmarkIconProps> = ({
  width = 24,
  height = 24,
  color = "var(--color_brand01)",
  isFill = false,
  fillColor = "var(--color_brand01_light)",
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
        d="M21 16.09V11.098C21 6.808 21 4.665 19.682 3.332C18.364 2 16.242 2 12 2C7.758 2 5.636 2 4.318 3.332C3 4.664 3 6.81 3 11.098V16.091C3 19.187 3 20.736 3.734 21.412C4.084 21.735 4.526 21.938 4.997 21.992C5.984 22.105 7.137 21.085 9.442 19.046C10.462 18.145 10.971 17.694 11.56 17.576C11.85 17.516 12.15 17.516 12.44 17.576C13.03 17.694 13.539 18.145 14.558 19.046C16.863 21.085 18.016 22.105 19.003 21.991C19.473 21.938 19.916 21.735 20.266 21.412C21 20.736 21 19.187 21 16.09Z"
        stroke={color}
        strokeWidth="1.5"
        fill={isFill ? fillColor : "none"}
      />
      <path
        opacity="0.5"
        d="M15 6H9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default BookmarkIcon;
