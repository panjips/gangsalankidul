import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export const SwiperCarousel = ({ datas }) => {
  return (
    <section className="w-full">
      <div className="h-[360px]">
        <Swiper
          autoplay={true}
          loop={true}
          className="h-full"
          modules={[Autoplay, Navigation, Pagination]}
        >
          {datas.map((data, index) => (
            <SwiperSlide key={index}>
              <img
                alt="foto-struktur"
                src={data}
                className="aspect-video md:aspect-square h-full w-full object-contain rounded-t-md md:rounded-l-md md:rounded-tr-none group-hover:scale-110 transition-transform"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
