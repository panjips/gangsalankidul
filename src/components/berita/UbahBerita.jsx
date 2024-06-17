import React, { useState } from "react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { uploadFile, getFile } from "@/lib/storage";
import toast from "react-hot-toast";
import { updateBerita } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { FormBerita } from "@/components/form/FormBerita";
import * as yup from "yup";

export const UbahBerita = ({
  value,
  setValue,
  updateValue,
  setUpdateValue,
}) => {
  const breadcrumb = ["Berita", "Ubah Berita"];
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateBerita = async (e) => {
    e.preventDefault();
    try {
      let newBerita = [];
      setIsLoading(true);

      if (updateValue.thumbnail instanceof File) {
        const schema = yup.object().shape({
          thumbnail: yup
            .mixed()
            .test(
              "fileType",
              "Thumbnail harus berupa file gambar (jpg/jpeg/png)",
              (value) => {
                if (!value) return true;
                return ["image/jpg", "image/jpeg", "image/png"].includes(
                  value.type
                );
              }
            )
            .test(
              "fileSize",
              "Ukuran thumbnail tidak boleh lebih dari 1MB",
              (value) => {
                if (!value) return true;
                return value.size <= 1048576;
              }
            ),
        });

        await schema.validate({ thumbnail: updateValue.thumbnail });
        const imagePath = await uploadFile(updateValue.thumbnail, value.folder);
        const imageUrl = await getFile(imagePath);

        newBerita.push({ thumbnail: imageUrl });
      }

      if (updateValue.lampiran.length !== 0) {
        const newLampiran = await Promise.all(
          updateValue.lampiran.map(async (lampiran) => {
            const schema = yup.object().shape({
              lampiran: yup
                .mixed()
                .test(
                  "fileType",
                  "Lampiran harus berupa file gambar (jpg/jpeg/png)",
                  (value) => {
                    if (!value) return true;
                    return ["image/jpg", "image/jpeg", "image/png"].includes(
                      value.type
                    );
                  }
                )
                .test(
                  "fileSize",
                  "Ukuran lampiran tidak boleh lebih dari 1MB",
                  (value) => {
                    if (!value) return true;
                    return value.size <= 1048576;
                  }
                ),
            });

            if (lampiran instanceof File) {
              try {
                await schema.validate({ lampiran });

                const imagePath = await uploadFile(lampiran, value.folder);
                const imageUrl = await getFile(imagePath);
                return imageUrl;
              } catch (error) {
                toast.error(error.message);
              }
            } else {
              return lampiran;
            }
          })
        );
        const isLampiranValid = newLampiran.every(
          (lampiran) => typeof lampiran === "string"
        );
        if (!isLampiranValid)
          throw new yup.ValidationError("Terjadi kesalahan pada lampiran");
        else newBerita = { ...newBerita, lampiran: { ...newLampiran } };
      }

      await toast.promise(
        updateBerita(value.id, { ...updateValue, ...newBerita }),
        {
          loading: "Menyimpan berita...",
          success: "Berita berhasil disimpan",
          error: "Gagal menyimpan berita",
        }
      );

      setIsLoading(false);

      router.push("/dashboard/berita");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-6">
      <div className="my-2">
        <Breadcrumb path={breadcrumb} />
      </div>

      <div className="my-4">
        <h1 className="text-3xl font-semibold text-slate-700">Ubah Berita</h1>
      </div>

      <FormBerita
        isLoading={isLoading}
        value={updateValue}
        setValue={setUpdateValue}
        func={handleUpdateBerita}
      />
    </div>
  );
};
