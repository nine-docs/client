import React from "react";
import { useLocation } from "react-router-dom";

import classes from "./SideNavItem.module.scss";

type SideNavItemProps = {
  title: string;
  path: string;
};

const SideNavItem: React.FC<SideNavItemProps> = ({ title, path }) => {
  const pathname = useLocation().pathname;

  const isCurPath = pathname === path;

  return (
    <button
      className={`${classes.item_wrap} ${isCurPath ? classes.cur_item : undefined}`}
    >
      <span>{title}</span>
    </button>
  );
};

export default SideNavItem;
