import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export const SwiperCarousel = () => {
  const data = [
    {
      id: 1,
      title: "SELAMAT DATANG",
      tagline: "",
      image: "/image1.jpeg",
    },
    {
      id: 2,
      title: "GANGSALAN KIDUL",
      tagline: "UNOFFICIAL WEBSITE",
      image: "/image2.jpeg",
    },
    {
      id: 3,
      title: "GANGSALAN KIDUL",
      tagline: "HARMONI MASYARAKAT",
      image: "/image3.jpeg",
    },
  ];

  return (
    <section className="w-full">
      <div className="h-[75vh]">
        <Swiper
          autoplay={true}
          loop={true}
          className="h-full"
          modules={[Autoplay, Navigation, Pagination]}
        >
          {data.map(({ id, image, tagline, title }) => (
            <SwiperSlide key={id}>
              <Image
                priority
                src={`${image}`}
                alt="Carousel Image"
                fill
                style={{
                  objectFit: "cover",
                  maskImage: `linear-gradient(to top, transparent, black 30%)`,
                  filter: "brightness(60%)",
                }}
              ></Image>
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  {tagline && (
                    <p className="text-md sm:text-xl lg:text-3xl font-semibold text-white/90">
                      {tagline}
                    </p>
                  )}
                  <p className="text-3xl sm:text-4xl lg:text-8xl font-bold text-white/90">
                    {title}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
