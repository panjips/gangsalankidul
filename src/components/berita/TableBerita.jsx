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
} from "@nextui-org/react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getAllBerita, deleteBerita } from "@/lib/firestore";
import dayjs from "dayjs";

export const TableBerita = () => {
  const router = useRouter();

  const [collectionData, setCollectionData] = useState([]);

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
      const data = await getAllBerita("berita");
      setCollectionData(data);
    };
    fetchData();
  }, []);

  const headCell = [
    { id: "judul", label: "Judul" },
    { id: "tanggal", label: "Tanggal" },
    { id: "action", label: "Action" },
  ];

  const breadcrumb = ["Berita"];

  const handleTambah = () => {
    router.push("/dashboard/berita/tambah");
  };

  const handleUbah = (id) => {
    router.push(`/dashboard/berita/ubah/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBerita(id);
      const data = await getAllBerita("berita");
      setCollectionData(data);
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
            <strong className="text-green-800 font-bold">BERITA</strong>
          </p>
          <div className="bg-green-600 h-1 w-32"></div>
        </div>
      </div>

      <div className="w-full my-3 flex justify-end">
        <Button
          color="success"
          size="md"
          variant="flat"
          onClick={handleTambah}
          className="shadow-sm"
        >
          Tambah Berita
        </Button>
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
              let date = dayjs(data.tanggal_berita).format("DD MMMM YYYY");
              return (
                <TableRow key={index}>
                  <TableCell>{data.judul}</TableCell>
                  <TableCell>{date}</TableCell>
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
                          onClick={() => handleDelete(data.id)}
                        />
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
