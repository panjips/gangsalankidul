import * as yup from "yup";

const fileTypeTest = (message, allowedTypes) =>
  yup.mixed().test("fileType", message, (value) => {
    if (!value) return true;
    return allowedTypes.includes(value.type);
  });

const fileSizeTest = (message, maxSize) =>
  yup.mixed().test("fileSize", message, (value) => {
    if (!value) return true;
    return value.size <= maxSize;
  });

const beritaSchema = yup.object().shape({
  judul: yup.string().required("Judul tidak boleh kosong"),
  tanggal_berita: yup.date().required("Tanggal berita tidak boleh kosong"),
  berita: yup.string().required("Berita tidak boleh kosong"),
  thumbnail: fileTypeTest("Thumbnail harus berupa file gambar (jpg/jpeg/png)", [
    "image/jpg",
    "image/jpeg",
    "image/png",
  ]).concat(
    fileSizeTest("Ukuran thumbnail tidak boleh lebih dari 1MB", 1048576)
  ),
  lampiran: yup
    .array()
    .of(
      fileTypeTest("Lampiran harus berupa file gambar (jpg/jpeg/png)", [
        "image/jpg",
        "image/jpeg",
        "image/png",
      ]).concat(
        fileSizeTest("Ukuran lampiran tidak boleh lebih dari 1MB", 1048576)
      )
    )
    .optional(),
});

export { beritaSchema };
