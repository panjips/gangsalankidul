import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import { MdImage, MdClose, MdCheck } from "react-icons/md";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import Image from "next/image";
import * as yup from "yup";
import { uploadFile, getFile } from "@/lib/storage";
import { getPathImageFromURL } from "@/lib/constants";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { deleteFile } from "@/lib/storage";
import {
  addData,
  getAllBerita,
  addStruktur,
  deleteStruktur,
  updateData,
  deleteBerita,
} from "@/lib/firestore";
import { profilSchema } from "@/lib/form-schema";
import { ModalProfil as ModalTambah } from "@/components/profil/TambahProfil";
import { ModalProfil as ModalUbah } from "@/components/profil/TambahProfil";

export const TableProfil = () => {
  const {
    isOpen: isOpenTambahProfil,
    onOpen: onOpenTambahProfil,
    onOpenChange: onOpenChangeTambahProfil,
    onClose: onCloseTambahProfil,
  } = useDisclosure();

  const {
    isOpen: isOpenUbahProfil,
    onOpen: onOpenUbahProfil,
    onOpenChange: onOpenChangeUbahProfil,
    onClose: onCloseUbahProfil,
  } = useDisclosure();

  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState({});
  const [collectionData, setCollectionData] = useState([]);
  const [image, setImage] = useState(null);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(collectionData.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return collectionData?.slice(start, end);
  }, [page, collectionData]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBerita("profil");
      setCollectionData(data);
    };
    fetchData();
  }, [refresh]);

  const headCell = [
    { id: "judul", label: "Judul" },
    { id: "deskripsi", label: "Deskripsi" },
    { id: "action", label: "Action" },
  ];

  const handleInsertInformasi = async () => {
    try {
      await profilSchema.validate(input);

      const insert = Promise.all([addData(input, "profil")]);
      await toast
        .promise(insert, {
          loading: "Menyimpan profil...",
          success: "Profil berhasil disimpan",
          error: "Gagal menyimpan profil",
        })
        .then(() => {
          onCloseTambahProfil();
          setInput({});
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error(error.message);
      setInput({});
    }
  };

  const handleChange = (e) => {
    setImage((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleCancel = () => {
    setImage(null);
  };

  const handleInsertStruktur = async () => {
    try {
      const imageSchema = yup.object().shape({
        struktur: yup
          .mixed()
          .test(
            "fileType",
            "Struktur harus berupa file gambar (jpg/jpeg/png)",
            (value) => {
              if (!value) return true;
              return ["image/jpg", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
          )
          .test(
            "fileSize",
            "Ukuran struktur tidak boleh lebih dari 1MB",
            (value) => {
              if (!value) return true;
              return value.size <= 1048576;
            }
          ),
      });

      await imageSchema.validate(image);

      const imagePath = await uploadFile(image.struktur, "struktur/");
      const imageUrl = await getFile(imagePath);

      const insert = Promise.all([addStruktur(imageUrl)]);
      await toast
        .promise(insert, {
          loading: "Menyimpan struktur...",
          success: "Struktur berhasil disimpan",
          error: "Gagal menyimpan struktur",
        })
        .then(() => {
          setImage(null);
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error(error.message);
      setImage(null);
    }
  };

  const handleDeleteStruktur = async (data) => {
    try {
      const deletePhotoStruktur = Promise.all([
        deleteFile(getPathImageFromURL(data)),
        deleteStruktur(data),
      ]);

      await toast
        .promise(deletePhotoStruktur, {
          loading: "Menghapus struktur...",
          success: "Struktur berhasil dihapus",
          error: "Gagal menghapus struktur",
        })
        .then(() => {
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.message(error.message);
    }
  };

  const handleDeleteProfil = async (id) => {
    try {
      const deleteProfile = Promise.all([deleteBerita(id, "profil")]);
      await toast
        .promise(deleteProfile, {
          loading: "Menghapus profil...",
          success: "Profil berhasil dihapus",
          error: "Gagal menghapus profil",
        })
        .then(() => {
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const struktur =
    collectionData.find((data) => data.id === "struktur") ?? null;

  const handleUbahProfil = async () => {
    try {
      await profilSchema.validate(input);

      const update = Promise.all([
        updateData(
          input.id,
          { judul: input.judul, berita: input.berita },
          "profil"
        ),
      ]);
      await toast
        .promise(update, {
          loading: "Mengubah profil...",
          success: "Profil berhasil disimpan",
          error: "Gagal mengubah profil",
        })
        .then(() => {
          onCloseUbahProfil();
          setInput({});
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error(error.message);
      onCloseUbahProfil();
      setInput({});
    }
  };

  return (
    <div className="mx-6">
      <div className="my-3 w-full">
        <div className="border-b border-b-green-300 mb-4">
          <p className="text-xl font-light text-green-700 mb-2">
            DASHBOARD{" "}
            <strong className="text-green-800 font-bold">PROFIL</strong>
          </p>
          <div className="bg-green-600 h-1 w-32"></div>
        </div>
      </div>

      <div className="w-full my-3 flex justify-end">
        <Button
          color="success"
          size="md"
          variant="flat"
          onClick={onOpenTambahProfil}
          className="shadow-sm"
        >
          Tambah Informasi
        </Button>
        <ModalTambah
          isOpen={isOpenTambahProfil}
          onOpenChange={onOpenChangeTambahProfil}
          input={input}
          setInput={setInput}
          insertProfil={handleInsertInformasi}
          action="Tambah"
        />
      </div>

      <div>
        <Table
          aria-label="Table Berita"
          radius="sm"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                color="secondary"
                page={page}
                total={pages}
                hidden={collectionData.length == 0 ? true : false}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader className="flex justify-center">
            {headCell.map((cell) => (
              <TableColumn key={cell.id}>{cell.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={items}>
            {(data, index) => {
              if (data.id === "struktur") return;
              const sanitized = DOMPurify.sanitize(data.berita);
              return (
                <TableRow key={index}>
                  <TableCell>{data.judul}</TableCell>
                  <TableCell className="max-w-sm">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: sanitized }}
                    ></div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <div
                        onClick={() => {
                          setInput(data);
                          onOpenUbahProfil();
                        }}
                        className="p-2 border rounded-md border-orange-200 hover:bg-orange-100 transition duration-300 active:bg-orange-200"
                      >
                        <MdModeEdit className="text-orange-500" />
                      </div>
                      {!data.judul.includes("Tentang Padukuhan") &&
                        !data.judul.includes("Sejarah Padukuhan") && (
                          <div className="p-2 border rounded-md border-red-300 hover:bg-red-50 transition duration-300 active:bg-red-100">
                            <MdDelete
                              className="text-red-500"
                              onClick={() => handleDeleteProfil(data.id)}
                            />
                          </div>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
        <ModalUbah
          isOpen={isOpenUbahProfil}
          onOpenChange={onOpenChangeUbahProfil}
          input={input}
          setInput={setInput}
          insertProfil={handleUbahProfil}
          action="Ubah"
        />
      </div>

      <div className="my-4 w-full">
        <div className="border-b border-b-green-300 mb-4">
          <p className="text-xl font-light text-green-700 mb-2">
            STRUKTUR{" "}
            <strong className="text-green-800 font-bold">ORGANISASI</strong>
          </p>
          <div className="bg-green-600 h-1 w-32"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {struktur &&
          struktur.photo.map((photo, index) => {
            return (
              <div
                key={index}
                className="flex justify-center items-center relative h-64 rounded-lg overflow-hidden border border-default-200 shadow-sm"
              >
                <div className="flex gap-2 z-10 absolute right-2 top-2">
                  <div
                    onClick={() => handleDeleteStruktur(photo)}
                    className="h-6 w-6 bg-red-400 hover:bg-red-500 transition-all cursor-pointer flex justify-center items-center rounded-md"
                  >
                    <MdClose className="text-white" />
                  </div>
                </div>
                <Image
                  priority
                  fill
                  sizes="100%"
                  style={{
                    objectFit: "cover",
                    borderRadius: 7,
                  }}
                  src={photo}
                  alt="foto_produk"
                />
              </div>
            );
          })}
        {!image ? (
          <label className="border-2 border-default-200 shadow-sm border-dashed py-[22px] rounded-lg flex justify-center h-64 items-center flex-col ">
            <MdImage size={48} className="text-gray-300" />
            <div
              className="flex justify-center
            items-center flex-col"
            >
              <p className="text-gray-500 text-[8px]">
                <span className="font-bold text-indigo-600 cursor-pointer">
                  Unggah
                </span>{" "}
                struktur format
              </p>
              <p className="text-gray-500 text-[8px]">jpg, jpeg, or png.</p>
            </div>
            <input
              type="file"
              className="sr-only"
              name="struktur"
              id="struktur"
              accept=".jpg,.jpeg,.png"
              onChange={handleChange}
            />
          </label>
        ) : (
          <div className="flex justify-center items-center relative h-64 rounded-lg overflow-hidden border border-default-200 shadow-sm">
            <div className="flex gap-2 z-10 absolute right-2 top-2">
              <div
                onClick={handleCancel}
                className="h-6 w-6 bg-red-400 hover:bg-red-500 transition-all cursor-pointer flex justify-center items-center rounded-md"
              >
                <MdClose className="text-white" />
              </div>
              <div
                onClick={handleInsertStruktur}
                className="h-6 w-6 bg-indigo-400 hover:bg-indigo-500 transition-all cursor-pointer flex justify-center items-center rounded-md"
              >
                <MdCheck className="text-white" />
              </div>
            </div>
            <Image
              fill
              sizes="100%"
              style={{
                objectFit: "cover",
                borderRadius: 7,
              }}
              src={URL.createObjectURL(image.struktur)}
              alt="foto_produk"
            />
          </div>
        )}
      </div>
    </div>
  );
};
