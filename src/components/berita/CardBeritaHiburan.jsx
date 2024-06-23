import React from "react";
import { Card, Skeleton } from "@nextui-org/react";
import dayjs from "dayjs";
import Link from "next/link";

export const CardBeritaHiburan = ({ data }) => {
  const date = dayjs(data.isoDate).format("DD MMMM YYYY");
  return (
    <article className="h-96 relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
      <Link href={data.link}>
        <img
          alt=""
          src={data.image.large}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="h-96 relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 flex flex-col justify-end">
          <div className="p-4 sm:p-6">
            <time dateTime="2022-10-10" className="block text-xs text-white/90">
              {date}
            </time>

            <h3 className="mt-0.5 text-lg text-white">{data.title}</h3>

            <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
              {data.contentSnippet}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export const SkeletonCardBeritaHiburan = ({ className }) => {
  return (
    <Card
      className={`bg-gradient-to-t from-gray-400/60 to-gray-100/15 h-96 w-full space-y-5 border border-gray-200 p-6 shadow-none ${className}`}
      radius="md"
    >
      <div className="space-y-3 flex flex-col justify-end h-full">
        <Skeleton className="w-1/3 rounded-md">
          <div className="h-3 w-1/3 rounded-md bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-full rounded-md">
          <div className="h-3 w-full rounded-md bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-md">
          <div className="h-3 w-3/5 rounded-md bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-md">
          <div className="h-3 w-4/5 rounded-md bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-md">
          <div className="h-3 w-2/5 rounded-md bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
