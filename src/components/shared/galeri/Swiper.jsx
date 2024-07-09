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
          className="h-full"
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
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
