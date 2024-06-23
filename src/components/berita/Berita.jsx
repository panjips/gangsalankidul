import React, { useState, useEffect } from "react";
import { Breadcrumb } from "@/components/shared/home/Breadcrumb";
import { CardBerita, CardBeritaSkeleton } from "@/components/berita/CardBerita";
import { VscSearch } from "react-icons/vsc";

export const Berita = ({ berita }) => {
  const items = ["Berita"];
  const [length, setLength] = useState(6);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      berita.filter((data) => {
        return data.judul.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, berita]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

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

  return (
    <div className="mx-6 min-h-screen">
      <div className="my-2">
        <Breadcrumb items={items} />
      </div>

      <div className="border-b border-b-green-300 mb-6 mt-4">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-light text-green-700 mb-2">BERITA</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berita..."
              className="border pl-3 pr-7 py-2 rounded-md text-xs focus:outline-none border-green-300 focus:border-green-600 w-32 md:w-64 text-slate-600"
              onChange={handleChange}
            />
            <VscSearch className="absolute right-2 top-2 text-green-600" />
          </div>
        </div>
        <div className="bg-green-600 h-1 w-32"></div>
      </div>

      <div className="flex flex-col gap-4">
        {berita.length === 0 ? (
          SkeletonBerita()
        ) : filteredData.length === 0 ? (
          <p className="text-center text-lg text-slate-500">
            Berita tidak ditemukan
          </p>
        ) : (
          filteredData
            .slice(0, length)
            .map((berita, index) => <CardBerita key={index} berita={berita} />)
        )}
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
