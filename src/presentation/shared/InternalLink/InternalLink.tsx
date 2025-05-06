import React from "react";
import { Link, LinkProps } from "react-router-dom";

import clsx from "clsx";

import { useStyles } from "./styles";

export const InternalLink: React.FC<LinkProps> = ({ className, ...props }) => {
  const classes = useStyles();

  return <Link className={clsx(classes.root, className)} {...props} />;
};

export default InternalLink;
