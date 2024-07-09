import React from "react";
import { Breadcrumb } from "@/components/shared/home/Breadcrumb";
import Image from "next/image";
import { SwiperCarousel } from "@/components/shared/galeri/Swiper";

export const Galeri = ({ dataBerita, dataGaleri }) => {
  const items = [{ label: "Galeri", href: "/galeri" }];
  const galeri = [...dataBerita, ...dataGaleri];

  return (
    <section className="mx-6">
      <div className="my-2">
        <Breadcrumb items={items} />
      </div>
      <div className="border-b border-b-green-300 mb-6 mt-4">
        <p className="text-2xl font-light text-green-700 mb-2">
          GALERI <strong className="text-green-800 font-bold">PADUKUHAN</strong>
        </p>
        <div className="bg-green-600 h-1 w-32"></div>
      </div>
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 relative">
          {galeri.map((data, index) => {
            return (
              <SwiperCarousel datas={data.lampiran || data.image} judul={data.judul} key={index} />
            );
          })}
        </div>
      </div>
    </section>
  );
};
