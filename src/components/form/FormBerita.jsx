import React from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { MdImage, MdClose } from "react-icons/md";
import { RichTextEditor } from "@/components/form/quill/RichTextEditor";
import Image from "next/image";

export const FormBerita = ({ value, setValue, isLoading, func }) => {
  const handleChange = (e) => {
    if (e.target.name === "thumbnail")
      setValue((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    else if (e.target.name === "lampiran")
      setValue((prev) => ({
        ...prev,
        [e.target.name]: [...prev.lampiran, e.target.files[0]],
      }));
    else setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDeleteFoto = () => {
    delete value.thumbnail;
    setValue((prev) => ({ ...prev }));
  };

  return (
    <form className="grid grid-cols-2 gap-4">
      <Input
        type="text"
        variant="bordered"
        label="Judul Berita"
        name="judul"
        className="col-span-2 md:col-span-1"
        value={value.judul ? value.judul : ""}
        onChange={handleChange}
        disabled={isLoading}
      />
      <Input
        type="date"
        variant="bordered"
        label="Tanggal Berita"
        name="tanggal_berita"
        className="col-span-2 md:col-span-1"
        onChange={handleChange}
        value={value.tanggal_berita ? value.tanggal_berita : ""}
        disabled={isLoading}
      />

      {!value.thumbnail ? (
        <label className="col-span-2 border-2 border-default-200 shadow-sm border-dashed py-[22px] rounded-lg h-32 flex justify-center items-center flex-col ">
          <MdImage size={48} className="text-gray-300" />
          <div
            className="flex justify-center
            items-center flex-col"
          >
            <p className="text-gray-500 text-[8px]">
              <span className="font-bold text-indigo-600 cursor-pointer">
                Unggah
              </span>{" "}
              thumbnail format
            </p>
            <p className="text-gray-500 text-[8px]">jpg, jpeg, or png.</p>
          </div>
          <input
            type="file"
            className="sr-only"
            name="thumbnail"
            id="thumbnail"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            disabled={isLoading}
          />
        </label>
      ) : (
        <div className="col-span-2 flex justify-center items-center relative h-36 rounded-lg overflow-hidden border border-default-200 shadow-sm">
          <div
            onClick={handleDeleteFoto}
            className="z-10 absolute right-1 top-1 cursor-pointer"
          >
            <MdClose className="text-indigo-500" />
          </div>
          <Image
            fill
            sizes="100%"
            style={{
              objectFit: "cover",
              borderRadius: 7,
            }}
            src={
              typeof value.thumbnail == "string"
                ? value.thumbnail
                : URL.createObjectURL(value.thumbnail)
            }
            alt="foto_produk"
          />
        </div>
      )}

      <div className="col-span-2">
        <RichTextEditor value={value} setValue={setValue} />
      </div>

      <div className="col-span-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
        {value.lampiran?.map((lampiran, index) => (
          <div
            key={index}
            className="flex justify-center items-center relative h-28 lg:h-36 rounded-lg overflow-hidden border border-default-200 shadow-sm"
          >
            <div
              onClick={() => {
                value.lampiran.splice(index, 1);
                setValue((prev) => ({ ...prev }));
              }}
              className="z-10 absolute right-1 top-1 cursor-pointer"
            >
              <MdClose className="text-indigo-500" />
            </div>
            <Image
              fill
              sizes="100%"
              style={{
                objectFit: "cover",
                borderRadius: 7,
              }}
              src={
                typeof lampiran == "string"
                  ? lampiran
                  : URL.createObjectURL(lampiran)
              }
              alt="foto_produk"
            />
          </div>
        ))}
        <label className="w-full h-28 lg:h-36 border-2 border-default-200 shadow-sm rounded-lg border-dashed flex justify-center items-center flex-col">
          <MdImage size={36} className="text-gray-300" />
          <div
            className="flex justify-center
            items-center flex-col"
          >
            <p className="text-gray-500 text-[6px]">
              <span className="font-bold text-indigo-600 cursor-pointer">
                Unggah
              </span>{" "}
              lampiran format
            </p>
            <p className="text-gray-500 text-[6px]">jpg, jpeg, or png.</p>
          </div>
          <input
            type="file"
            className="sr-only"
            name="lampiran"
            id="lampiran"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            disabled={isLoading}
          />
        </label>
      </div>

      <div className="col-span-2 flex justify-end mb-4">
        <Button
          color="success"
          size="md"
          variant="flat"
          onClick={func}
          disabled={isLoading}
        >
          Simpan
        </Button>
      </div>
    </form>
  );
};
