import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { MdDashboard } from "react-icons/md";

export const Breadcrumb = ({ path }) => {
  return (
    <div>
      <Breadcrumbs
        underline="hover"
        classNames={{
          list: "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-small",
        }}
        itemClasses={{
          item: "text-white/60 data-[current=true]:text-white",
          separator: "text-white/40",
        }}
        variant="solid"
      >
        <BreadcrumbItem href="/">
          <MdDashboard />
        </BreadcrumbItem>
        {path.map((item, index) => (
          <BreadcrumbItem key={`${index}`} href="#">
            {item}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};
