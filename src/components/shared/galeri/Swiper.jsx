import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.css";
import { useDisclosure } from "@nextui-org/react";
import { ImageModal } from "@/components/shared/galeri/ModalGaleri";
import React, { useState } from "react";

export const SwiperCarousel = ({ datas }) => {
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
            "--swiper-pagination-bullet-inactive-opacity": "0.8",
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
              <img
                alt="galeri"
                src={data}
                className="aspect-square h-full w-full object-cover rounded-md"
                onClick={() => handleImageClick(data)}
              />
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
