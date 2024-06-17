import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

export const Breadcrumb = ({ items }) => {
  return (
    <div className="bg-green-50 w-full rounded-md h-12 border border-green-300 flex justify-start py-2 px-4 items-center">
      <Breadcrumbs>
        <BreadcrumbItem color="success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </BreadcrumbItem>
        {items.map((item, index) => (
          <BreadcrumbItem
            key={index}
            color={index === items.length - 1 ? "" : "success"}
          >
            {item}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
};
