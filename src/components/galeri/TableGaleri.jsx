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
import { ModalGambar } from "@/components/galeri/TambahGambar";
import { nanoid } from "nanoid";
import { addData } from "@/lib/firestore";
import toast from "react-hot-toast";

export const TableGaleri = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [collectionData, setCollectionData] = useState([]);
  const [input, setInput] = useState({ image: [] });

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
  }, []);

  const headCell = [
    { id: "gambar", label: "Gambar" },
    { id: "judul", label: "Judul" },
    { id: "action", label: "Action" },
  ];

  const handleInsert = async (e) => {
    const folder = `galeri/${nanoid()}/`;
    let newImage = { ...input };
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
      console.log("Data berhasil disimpan");
      setInput({ image: [] });
      onClose();
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
          onClick={onOpen}
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
                      <div className="p-2 border rounded-md border-orange-200 hover:bg-orange-100 transition duration-300 active:bg-orange-200">
                        <MdModeEdit
                          className="text-orange-500"
                          onClick={() => handleUbah(data.id)}
                        />
                      </div>
                      <div className="p-2 border rounded-md border-red-300 hover:bg-red-50 transition duration-300 active:bg-red-100">
                        <MdDelete
                          className="text-red-500"
                          onClick={() => handleDelete(data)}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ModalGambar
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          input={input}
          setInput={setInput}
          handleInsert={handleInsert}
        />
      </div>
    </div>
  );
};
