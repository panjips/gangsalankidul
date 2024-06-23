import React, { useRef, useState, useEffect } from "react";
import { CardBerita, CardBeritaSkeleton } from "@/components/berita/CardBerita";
import { CardAgenda, CardAgendaSkeleton } from "@/components/agenda/CardAgenda";
import { MdArrowForward } from "react-icons/md";
import Link from "next/link";
import { SwiperHiburan } from "@/components/shared/home/SwiperHiburan";
import { toNanosecond } from "@/lib/constants";

export const Home = ({ berita, external, agenda }) => {
  const refWidth = useRef();
  const [width, setWidth] = useState(0);
  const [filteredAgenda, setFilteredAgenda] = useState([]);

  useEffect(() => {
    setFilteredAgenda(handleFilterAgenda);

    const handleResize = (entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);

    if (refWidth.current) {
      resizeObserver.observe(refWidth.current);
    }
    return () => {
      if (refWidth.current) {
        resizeObserver.unobserve(refWidth.current);
      }
    };
  }, [agenda]);

  const dateNow = new Date().getTime();

  const handleFilterAgenda = agenda.filter((agenda) => {
    return toNanosecond(agenda.tanggal) > dateNow;
  });

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
    <div className="m-6">
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 md:col-span-2">
          <div className="border-b border-b-green-300 mb-6">
            <p className="text-2xl font-light text-green-700 mb-2">
              BERITA{" "}
              <strong className="text-green-800 font-bold">TERKINI</strong>
            </p>
            <div className="bg-green-600 h-1 w-32"></div>
          </div>
          <div className="flex flex-col gap-4">
            {berita.length === 0
              ? SkeletonBerita()
              : berita
                  .slice(0, 4)
                  .map((berita, index) => (
                    <CardBerita key={index} berita={berita} />
                  ))}
          </div>
          <div className="flex items-center justify-end mt-6">
            <Link
              href="/berita"
              className="text-green-700 flex gap-2 hover:text-green-900 transition"
            >
              <p className="font-semibold">LIHAT LAINNYA</p>
              <MdArrowForward size={24} />
            </Link>
          </div>
        </div>
        <div className="col-span-3 md:col-span-1">
          <div className="border-b border-b-green-300 mb-6">
            <p className="text-2xl font-light text-green-700 mb-2">
              AGENDA{" "}
              <strong className="text-green-800 font-bold">KEGIATAN</strong>
            </p>
            <div className="bg-green-600 h-1 w-32"></div>
          </div>
          <div className="flex flex-col gap-2">
            {agenda?.length === 0 ? (
              <CardAgendaSkeleton></CardAgendaSkeleton>
            ) : (
              filteredAgenda?.map((agenda, index) => (
                <CardAgenda key={index} agenda={agenda} />
              ))
            )}
          </div>
        </div>
        <div className="col-span-3">
          <div className="border-b border-b-green-300 mb-6">
            <p className="text-2xl font-light text-green-700 mb-2">
              BERITA{" "}
              <strong className="text-green-800 font-bold">HIBURAN</strong>
            </p>
            <div className="bg-green-600 h-1 w-32"></div>
          </div>

          <div className="w-full">
            <SwiperHiburan data={external} />
          </div>
        </div>
        <div className="col-span-3 md:col-span-2" ref={refWidth}>
          <div className="border-b border-b-green-300 mb-6">
            <p className="text-2xl font-light text-green-700 mb-2">
              LOKASI{" "}
              <strong className="text-green-800 font-bold">PADUKUHAN</strong>
            </p>
            <div className="bg-green-600 h-1 w-32"></div>
          </div>
          <iframe
            className="rounded-md shadow-md"
            width={width}
            height={360}
            src="https://maps.google.com/maps?q=Gangsalan+Kidul&t=k&z=15&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>
        <div className="col-span-3 md:col-span-1">
          <div className="border-b border-b-green-300 mb-6">
            <p className="text-2xl font-light text-green-700 mb-2">
              STRUKTUR{" "}
              <strong className="text-green-800 font-bold">ORGANISASI</strong>
            </p>
            <div className="bg-green-600 h-1 w-32"></div>
          </div>
          <div className="flex flex-col gap-2 group">
            <div className="h-[360px] rounded-md overflow-hidden">
              <img
                alt=""
                src="/struktur-organisasi.png"
                className="aspect-video md:aspect-square h-full w-full object-contain rounded-t-md md:rounded-l-md md:rounded-tr-none group-hover:scale-110 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
