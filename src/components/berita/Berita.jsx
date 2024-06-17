import React, { useState } from "react";
import { Breadcrumb } from "@/components/shared/home/Breadcrumb";
import { CardBerita, CardBeritaSkeleton } from "@/components/berita/CardBerita";

export const Berita = ({ berita }) => {
  const items = ["Berita"];
  const [length, setLength] = useState(6);

  const handleLoadMore = () => {
    setLength((prev) => prev + 5);
  };

  const SkeletonBerita = () => {
    return (
      <>
        <CardBeritaSkeleton />
        <CardBeritaSkeleton />
        <CardBeritaSkeleton />
        <CardBeritaSkeleton />
      </>
    );
  };

  console.log(length);

  return (
    <div className="mx-6">
      <div className="my-2">
        <Breadcrumb items={items} />
      </div>

      <div className="border-b border-b-green-300 mb-6 mt-4">
        <p className="text-2xl font-light text-green-700 mb-2">BERITA</p>
        <div className="bg-green-600 h-1 w-32"></div>
      </div>
      <div className="flex flex-col gap-4">
        {berita.length === 0
          ? SkeletonBerita()
          : berita
              .slice(0, length)
              .map((berita, index) => (
                <CardBerita key={index} berita={berita} />
              ))}
      </div>

      {berita.length > length && (
        <button
          className="h-10 w-full bg-green-500 border border-green-700 hover:bg-green-600 transition flex justify-center items-center rounded-md mt-6"
          onClick={handleLoadMore}
        >
          <p className="text-white font-semibold text-md">LEBIH BANYAK</p>
        </button>
      )}
    </div>
  );
};
