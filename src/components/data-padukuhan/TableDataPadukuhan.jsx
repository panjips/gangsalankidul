import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import { getAllBerita, updateData } from "@/lib/firestore";
import { ModalDataPadukuhan } from "@/components/data-padukuhan/UbahDataPadukuhan";

export const TableDataPadukuhan = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const headCell = [
    { id: "nama", label: "Nama" },
    { id: "jumlah", label: "Jumlah" },
    { id: "action", label: "Action" },
  ];

  const [collectionData, setCollectionData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBerita("data-padukuhan");
      setCollectionData(data);
    };
    fetchData();
  }, [refresh]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUbahAgenda = (data) => {
    try {
      if (data.nama === "" || data.jumlah === "")
        throw new Error("Data tidak boleh kosong");
      const update = Promise.all([
        updateData(
          data.id,
          {
            nama: data.nama,
            jumlah: data.jumlah,
          },
          "data-padukuhan"
        ),
      ]);
      toast
        .promise(update, {
          loading: "Mengubah data...",
          success: "Data berhasil diubah",
          error: "Gagal mengubah data",
        })
        .then(() => {
          onClose();
          setRefresh(!refresh);
          setInput({});
        });
    } catch (error) {
      toast.error(error.message);
      setInput({});
    }
  };

  return (
    <section className="mx-6">
      <div className="my-3 w-full">
        <div className="border-b border-b-green-300 mb-4">
          <p className="text-xl font-light text-green-700 mb-2">
            DASHBOARD{" "}
            <strong className="text-green-800 font-bold">DATA PADUKUHAN</strong>
          </p>
          <div className="bg-green-600 h-1 w-48"></div>
        </div>
      </div>

      <div>
        <Table aria-label="Table Berita" radius="sm">
          <TableHeader className="flex justify-center">
            {headCell.map((cell) => (
              <TableColumn key={cell.id}>{cell.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody items={collectionData}>
            {(data, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{data.nama}</TableCell>
                  <TableCell>{data.jumlah}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <div
                        onClick={() => {
                          setInput(data);
                          onOpen();
                        }}
                        className="p-2 border rounded-md border-orange-200 hover:bg-orange-100 transition duration-300 active:bg-orange-200"
                      >
                        <MdModeEdit className="text-orange-500" />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
        <ModalDataPadukuhan
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          input={input}
          handleChange={handleChangeInput}
          updateData={() => handleUbahAgenda(input)}
        />
      </div>
    </section>
  );
};
