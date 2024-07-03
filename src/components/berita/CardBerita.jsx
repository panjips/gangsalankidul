import React from "react";
import DOMPurify from "dompurify";
import slugify from "slugify";
import { selisihDate } from "@/lib/constants";

export const CardBerita = ({ berita }) => {
  const sanitized = DOMPurify.sanitize(berita.berita);
  const slug = slugify(berita.judul, { lower: true });
  return (
    <article className="flex group flex-col md:flex-row bg-white transition hover:shadow-md rounded-md">
      <div className="basis-36 overflow-hidden md:rounded-l-md">
        <img
          alt=""
          src={berita.thumbnail}
          className="aspect-video md:aspect-square h-full w-full object-cover rounded-t-md md:rounded-l-md md:rounded-tr-none group-hover:scale-110 group-hover:rotate-2 transition-transform"
        />
      </div>

      <div className="flex flex-1 flex-col rounded-md">
        <div className="p-2 sm:border-l-transparent sm:p-6">
          <a href={`/berita/${slug}`}>
            <h3 className="font-bold uppercase text-green-900">
              {berita.judul}
            </h3>
          </a>

          <p
            className="mt-2 line-clamp-2 text-sm/relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: sanitized }}
          ></p>
          <p className="my-2 font-light text-gray-700 text-sm">
            {selisihDate(berita.tanggal_berita)}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <a
            href={`/berita/${slug}`}
            className="block bg-green-300 px-5 py-3 text-center text-xs font-bold uppercase text-green-950 transition hover:bg-green-400 rounded-b-md md:rounded-b-none md:rounded-br-md"
          >
            Baca Berita
          </a>
        </div>
      </div>
    </article>
  );
};

export const CardBeritaSkeleton = () => {
  return (
    <article className="flex group flex-col md:flex-row bg-white transition hover:shadow-md rounded-md">
      <div className="basis-36 overflow-hidden md:rounded-l-md">
        <div className="animate-pulse bg-gray-300 h-full w-full rounded-t-md md:rounded-l-md md:rounded-tr-none"></div>
      </div>

      <div className="flex flex-1 flex-col rounded-md">
        <div className="p-2 sm:border-l-transparent sm:p-6">
          <div className="animate-pulse bg-gray-300 h-4 w-2/3 rounded-md mb-2"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-full rounded-md mb-2"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-5/6 rounded-md mb-2"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-4/6 rounded-md mb-2"></div>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <div className="animate-pulse bg-gray-300 px-12 py-4 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-gray-400 rounded-b-md md:rounded-b-none md:rounded-br-md"></div>
        </div>
      </div>
    </article>
  );
};
