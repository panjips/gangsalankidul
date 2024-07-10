import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { deleteFile } from "@/lib/storage";
import { getAllBerita, deleteBerita } from "@/lib/firestore";
import { getFile, uploadFile } from "@/lib/storage";
import {
  ModalGambar as ModalTambah,
  ModalGambar as ModalEdit,
} from "@/components/galeri/TambahGambar";
import { nanoid } from "nanoid";
import { addData, updateData } from "@/lib/firestore";
import toast from "react-hot-toast";
import * as yup from "yup";

export const TableGaleri = () => {
  const {
    isOpen: isOpenTambah,
    onOpen: onOpenTambah,
    onOpenChange: onOpenChangeTambah,
    onClose: onCloseTambah,
  } = useDisclosure();

  const {
    isOpen: isOpenUbah,
    onOpen: onOpenUbah,
    onOpenChange: onOpenChangeUbah,
    onClose: onCloseUbah,
  } = useDisclosure();

  const [collectionData, setCollectionData] = useState([]);
  const [input, setInput] = useState({ image: [] });
  const [refresh, setRefresh] = useState(false);

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
      const data = await getAllBerita("galeri");
      setCollectionData(data);
    };
    fetchData();
  }, [refresh]);

  const headCell = [
    { id: "gambar", label: "Gambar" },
    { id: "judul", label: "Judul" },
    { id: "action", label: "Action" },
  ];

  const handleInsert = async (e) => {
    const folder = `galeri/${nanoid()}/`;
    let newImage = { ...input, folder };
    try {
      if (input.image.length !== 0) {
        const uploadImage = await Promise.all(
          input.image.map(async (data) => {
            const imagePath = await uploadFile(data, folder);
            return await getFile(imagePath);
          })
        );
        newImage.image = uploadImage;
      }

      const upload = Promise.all([addData(newImage, "galeri")]);
      await toast.promise(upload, {
        loading: "Menyimpan data...",
        success: "data berhasil disimpan",
        error: "Gagal menyimpan data",
      });
      setInput({ image: [] });
      setRefresh(!refresh);
      onCloseTambah();
    } catch (error) {
      setInput({ image: [] });
      toast.error(error.message);
    }
  };

  const handleUbah = async (e) => {
    try {
      const newData = { ...input };
      const newImage = await Promise.all(
        input.image.map(async (item) => {
          if (typeof item !== "string") {
            const imagePath = await uploadFile(item, input.folder);
            return await getFile(imagePath);
          } else {
            return item;
          }
        })
      );

      newData.image = newImage;
      const uploadData = Promise.all([updateData(input.id, newData, "galeri")]);
      await toast.promise(uploadData, {
        loading: "Mengubah data...",
        success: "Data berhasil diubah",
        error: "Gagal mengubah data",
      });
      setRefresh(!refresh);
      onCloseUbah();
      setInput({ image: [] });
    } catch (error) {
      setInput({ image: [] });
      toast.error(error.message);
    }
  };

  const handleDelete = async (data) => {
    try {
      data.image.map(async (item) => {
        await deleteFile(item);
      });
      const deleteData = Promise.all([deleteBerita(data.id, "galeri")]);
      await toast.promise(deleteData, {
        loading: "Menghapus data...",
        success: "Data berhasil dihapus",
        error: "Gagal menghapus data",
      });

      const dataGaleri = await getAllBerita("galeri");
      setCollectionData(dataGaleri);
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  return (
    <div className="mx-6">
      <div className="my-3 w-full">
        <div className="border-b border-b-green-300 mb-4">
          <p className="text-xl font-light text-green-700 mb-2">
            DASHBOARD{" "}
            <strong className="text-green-800 font-bold">GALERI</strong>
          </p>
          <div className="bg-green-600 h-1 w-32"></div>
        </div>
      </div>

      <div className="w-full my-3 flex justify-end">
        <Button
          color="success"
          size="md"
          variant="flat"
          onClick={onOpenTambah}
          className="shadow-sm"
        >
          Tambah Galeri
        </Button>
      </div>

      <div>
        <Table
          aria-label="Table Galeri"
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
          <TableBody>
            {items.map((data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={data.image[0]}
                      alt="gambar"
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{data.judul}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <div
                        onClick={() => {
                          onOpenUbah();
                          setInput(data);
                        }}
                        className="p-2 border rounded-md border-orange-200 hover:bg-orange-100 transition duration-300 active:bg-orange-200"
                      >
                        <MdModeEdit className="text-orange-500" />
                      </div>
                      <div
                        className="p-2 border rounded-md border-red-300 hover:bg-red-50 transition duration-300 active:bg-red-100"
                        onClick={() => handleDelete(data)}
                      >
                        <MdDelete className="text-red-500" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ModalEdit
          isOpen={isOpenUbah}
          onOpenChange={onOpenChangeUbah}
          input={input}
          action={"edit"}
          setInput={setInput}
          handleInsert={handleUbah}
        />
        <ModalTambah
          isOpen={isOpenTambah}
          onOpenChange={onOpenChangeTambah}
          input={input}
          action={"tambah"}
          setInput={setInput}
          handleInsert={handleInsert}
        />
      </div>
    </div>
  );
};
