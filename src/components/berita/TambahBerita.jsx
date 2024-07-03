import React, { useState } from "react";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { uploadFile, getFile } from "@/lib/storage";
import { beritaSchema } from "@/lib/form-schema";
import toast from "react-hot-toast";
import { addData } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { FormBerita } from "@/components/form/FormBerita";
import { nanoid } from "nanoid";
import slugify from "slugify";

export const TambahBerita = () => {
  const breadcrumb = ["Berita", "Tambah Berita"];
  const router = useRouter();

  const [value, setValue] = useState({ lampiran: [] });
  const [isLoading, setIsLoading] = useState(false);

  const handleInsertBerita = async (e) => {
    e.preventDefault();
    try {
      await beritaSchema.validate(value);
      setIsLoading(true);
      let newBerita = { ...value };
      const folder = `berita/${nanoid()}/`;

      const imagePath = await uploadFile(value.thumbnail, folder);
      const imageUrl = await getFile(imagePath);
      newBerita.thumbnail = imageUrl;

      if (value.lampiran.length !== 0) {
        const uploadLampiran = await Promise.all(
          value.lampiran.map(async (lampiran) => {
            const lampiranPath = await uploadFile(lampiran, folder);
            return await getFile(lampiranPath);
          })
        );
        newBerita.lampiran = uploadLampiran;
      }

      newBerita.folder = folder;
      newBerita.slug = slugify(value.judul, { lower: true });
      const upload = Promise.all([addData(newBerita, "berita")]);
      await toast.promise(upload, {
        loading: "Menyimpan berita...",
        success: "Berita berhasil disimpan",
        error: "Gagal menyimpan berita",
      });

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
        <h1 className="text-3xl font-semibold text-slate-700">Tambah Berita</h1>
      </div>

      <FormBerita
        isLoading={isLoading}
        value={value}
        setValue={setValue}
        func={handleInsertBerita}
      />
    </div>
  );
};
