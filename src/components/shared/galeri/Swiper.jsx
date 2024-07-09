import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.css";
import { useDisclosure } from "@nextui-org/react";
import { ImageModal } from "@/components/shared/galeri/ModalGaleri";
import React, { useState } from "react";

export const SwiperCarousel = ({ datas, judul }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [currentImage, setCurrentImage] = useState("");

  const handleImageClick = (image) => {
    setCurrentImage(image);
    onOpen();
  };

  return (
    <section className="w-full ">
      <div className="h-full">
        <Swiper
          style={{
            "--swiper-pagination-color": "#FFFFFF",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
            "--swiper-pagination-bullet-size": "10px",
            "--swiper-pagination-bullet-horizontal-gap": "3px",
          }}
          className="h-full"
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {datas.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="relative group h-full w-full">
                <img
                  alt="galeri"
                  src={data}
                  className="aspect-square h-full w-full object-cover rounded-md"
                />
                <div
                  onClick={() => handleImageClick(data)}
                  className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center rounded-md"
                >
                  <span className="text-white text-sm p-12 text-center">
                    {judul}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <ImageModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          src={currentImage}
        />
      </div>
    </section>
  );
};
