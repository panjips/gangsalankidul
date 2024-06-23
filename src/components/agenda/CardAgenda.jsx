import React from "react";
import dayjs from "dayjs";
import { toNanosecond } from "@/lib/constants";

export const CardAgenda = ({ agenda }) => {
  let date = toNanosecond(agenda.tanggal);

  return (
    <div className="w-full border border-green-400 rounded-md h-16 flex items-center gap-2">
      <div className="w-20 h-16 rounded-l-md bg-green-600 flex justify-center items-center flex-col">
        <p className="text-white font-bold text-xl leading-none">
          {dayjs(date).format("DD")}
        </p>
        <p className="text-white font-light text-md leading-none">
          {dayjs(date).format("MMMM")}
        </p>
      </div>
      <div>
        <p className="text-slate-950 font-semibold text-xs line-clamp-1">
          {agenda.agenda}
        </p>
        <p className="text-slate-400 text-[10px] font-light line-clamp-1">
          {dayjs(date).format("HH:mm")}
        </p>
        {agenda.informasi && (
          <p className="text-slate-600 text-[10px] line-clamp-1">
            {agenda.informasi}
          </p>
        )}
      </div>
    </div>
  );
};

export const CardAgendaSkeleton = () => {
  return (
    <div className="w-full border border-green-400 rounded-md h-16 flex items-center gap-2">
      <div className="w-20 h-16 rounded-l-md bg-gray-300 flex justify-center items-center flex-col animate-pulse">
        <div className="bg-gray-400 h-4 w-8 rounded-md mb-2"></div>
        <div className="bg-gray-400 h-4 w-12 rounded-md"></div>
      </div>
      <div>
        <div className="animate-pulse bg-gray-300 h-4 w-2/3 rounded-md mb-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-5/6 rounded-md mb-2"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-4/6 rounded-md"></div>
      </div>
    </div>
  );
};
