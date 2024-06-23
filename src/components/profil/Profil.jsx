import React from "react";
import { Breadcrumb } from "@/components/shared/home/Breadcrumb";
import DOMPurify from "dompurify";
import Image from "next/image";

export const Profil = ({ data }) => {
  const items = ["Profil"];

  return (
    <div className="mx-6">
      <div className="my-2">
        <Breadcrumb items={items} />
      </div>
      {data.length == 0
        ? SkeletonInformasi()
        : data?.map((item, index) => {
            if (item.id === "struktur") return;
            const judul = item.judul.split(" ");
            return (
              <div key={index}>
                <div className="border-b border-b-green-300 mb-6 mt-4">
                  <p className="text-2xl font-light text-green-700 mb-2">
                    {judul[0].toUpperCase()}{" "}
                    <strong className="text-green-800 font-bold">
                      {judul
                        .slice(1)
                        .map((element) => {
                          return element.toUpperCase() + " ";
                        })
                        .flat()}
                    </strong>
                  </p>
                  <div className="bg-green-600 h-1 w-32"></div>
                </div>
                <div>
                  <p
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(item.berita),
                    }}
                  ></p>
                </div>
              </div>
            );
          })}

      {data.length != 0 && (
        <div className="border-b border-b-green-300 mb-2 mt-4">
          <p className="text-2xl font-light text-green-700 mb-2">
            STRUKTUR{" "}
            <strong className="text-green-800 font-bold">ORGANISASI</strong>
          </p>
          <div className="bg-green-600 h-1 w-32"></div>
        </div>
      )}

      <div>
        <div className="w-full grid grid-cols-2 gap-4">
          {data
            .find((item) => item.id === "struktur")
            ?.photo.map((photo, index) => {
              return (
                <div
                  key={index}
                  className="relative w-full aspect-square rounded-md"
                >
                  <Image
                    priority
                    fill
                    sizes="100%"
                    src={photo}
                    alt="Foto Struktur Organisasi"
                    className="rounded-md"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const SkeletonInformasi = () => {
  return (
    <>
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="border-b border-b-green-300 mb-6 mt-4">
            <p className="text-2xl font-light text-green-700 mb-2">
              <span className="bg-gray-300 rounded w-24 h-6 inline-block"></span>{" "}
              <strong className="text-green-800 font-bold">
                <span className="bg-gray-300 rounded w-32 h-6 inline-block"></span>
              </strong>
            </p>
            <div className="bg-green-600 h-1 w-32"></div>
          </div>
          <div>
            <p className="text-justify">
              <span className="bg-gray-200 block h-4 mb-2"></span>
              <span className="bg-gray-200 block h-4 mb-2"></span>
              <span className="bg-gray-200 block h-4 mb-2"></span>
              <span className="bg-gray-200 block h-4 mb-2"></span>
              <span className="bg-gray-200 block h-4 mb-2"></span>
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
