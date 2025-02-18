import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./NavItem.module.scss";

type NavItemProps = {
  title: string;
  path: string;
};

const NavItem: React.FC<NavItemProps> = ({ title, path }) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const isCurPath = pathname === path;

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      className={`${classes.item_wrap} ${isCurPath ? classes.cur_item : undefined}`}
      title={title}
      onClick={handleClick}
    >
      <span>{title}</span>
    </button>
  );
};

export default NavItem;
