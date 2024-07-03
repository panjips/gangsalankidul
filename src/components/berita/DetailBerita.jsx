import React from "react";
import { Breadcrumb } from "@/components/shared/home/Breadcrumb";
import dayjs from "dayjs";
import Image from "next/image";
import DOMPurify from "dompurify";

export const DetailBerita = ({ berita }) => {
  const items = ["Berita", "Detail Berita"];
  const date = dayjs(berita.tanggal_berita).format("DD MMMM YYYY");
  const getDay = dayjs(berita.tanggal_berita).day();
  let day = "";

  const sanitized = DOMPurify.sanitize(berita.berita);

  switch (getDay) {
    case 0:
      day = "Minggu";
      break;
    case 1:
      day = "Senin";
      break;
    case 2:
      day = "Selasa";
      break;
    case 3:
      day = "Rabu";
      break;
    case 4:
      day = "Kamis";
      break;
    case 5:
      day = "Jumat";
      break;
    case 6:
      day = "Sabtu";
      break;
    default:
      day = "";
  }

  return (
    <div className="mx-6">
      <div className="my-2">
        <Breadcrumb items={items} />
      </div>

      <div className="mt-4 flex justify-center flex-col items-center gap-3">
        <h1 className="text-3xl text-green-950 font-semibold">
          {berita.judul}
        </h1>
        <p className="text-sm font-light text-slate-500">{`${day}, ${date}`}</p>
        <div className="relative w-full h-48 md:h-96 aspect-video rounded-md">
          <Image
            src={berita.thumbnail}
            fill
            priority
            sizes="1080px"
            quality={10}
            alt="Foto Berita"
            className="rounded-md"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: sanitized }}
          className="text-justify"
        ></div>
      </div>

      {berita.lampiran.length != 0 && (
        <>
          <div className="border-b border-b-green-300 mb-6 mt-4">
            <p className="text-xl font-light text-green-700 mb-2">LAMPIRAN</p>
            <div className="bg-green-600 h-1 w-32"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {berita.lampiran.map((lampiran, index) => (
              <div
                key={index}
                className="relative w-full h-48 md:h-64 aspect-video rounded-md"
              >
                <Image
                  src={lampiran}
                  fill
                  priority
                  sizes="1080px"
                  quality={10}
                  alt="Foto Berita"
                  className="rounded-md"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
