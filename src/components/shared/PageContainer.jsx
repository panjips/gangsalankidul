import React from "react";
import clsx from "clsx";

export const PageContainer = ({ children, className }) => {
  return <section className={clsx("h-full max-w-5xl mx-auto")}>{children}</section>;
};
