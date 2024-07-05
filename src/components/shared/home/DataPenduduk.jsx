import React from "react";
import { TextTicker } from "@/components/shared/home/TextTicker";

export const DataPenduduk = ({ datas }) => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-green-900 sm:text-4xl">
            Padukuhan Gangsalan Kidul
          </h2>

          <p className="mt-4 text-green-800 sm:text-xl">
            Nglindur, Kecamatan Girisubo, Kabupaten Gunung Kidul, Daerah
            Istimewa Yogyakarta, Indonesia.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {datas.length === 0
              ? [1, 2, 3].map((value) => SkeletonDataPenduduk({ key: value }))
              : datas.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center"
                    >
                      <dt className="order-last text-lg font-medium text-gray-500">
                        {data.nama}
                      </dt>

                      <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                        <TextTicker value={data.jumlah} />
                      </dd>
                    </div>
                  );
                })}
          </dl>
        </div>
      </div>
    </section>
  );
};

const SkeletonDataPenduduk = ({ key }) => {
  return (
    <div
      key={key}
      className="animate-pulse flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center"
    >
      <div className="h-8 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-12 bg-gray-300 rounded-md"></div>
    </div>
  );
};
