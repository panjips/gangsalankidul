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

const agendaSchema = yup.object().shape({
  agenda: yup.string().required("Agenda tidak boleh kosong"),
  tanggal: yup.date().required("Tanggal agenda tidak boleh kosong"),
  informasi: yup.string().optional(),
});

const profilSchema = yup.object().shape({
  judul: yup.string().required("Judul tidak boleh kosong"),
  berita: yup.string().required("Isi tidak boleh kosong"),
});

export { beritaSchema, agendaSchema, profilSchema };
