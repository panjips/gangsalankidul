import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import {
  CardBeritaHiburan,
  SkeletonCardBeritaHiburan,
} from "@/components/berita/CardBeritaHiburan";

export const SwiperHiburan = ({ data }) => {
  return (
    <>
      <Swiper
        slidesPerView="1"
        autoplay={{
          delay: 2000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Pagination, Autoplay]}
      >
        {data ? (
          data.slice(0, 26).map((berita, index) => (
            <SwiperSlide key={index}>
              <CardBeritaHiburan data={berita} />
            </SwiperSlide>
          ))
        ) : (
          <>
            <div className="flex w-full gap-6">
              <SkeletonCardBeritaHiburan />
            </div>
          </>
        )}
      </Swiper>
    </>
  );
};
