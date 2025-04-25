import React from "react";
import { Helmet } from "react-helmet";

interface WindowTitleProps {
  title: string;
}

export const WindowTitle: React.FC<WindowTitleProps> = ({ title }) => {
  return <Helmet title={title} />;
};
