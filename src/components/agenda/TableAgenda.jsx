import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Button,
  Pagination,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { ModalAgenda as ModalTambah } from "@/components/agenda/TambahAgenda";
import { ModalAgenda as ModalUbah } from "@/components/agenda/UbahAgenda";
import {
  now,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  ZonedDateTime,
} from "@internationalized/date";
import { agendaSchema } from "@/lib/form-schema";
import {
  addData,
  getAllBerita,
  deleteAgenda,
  updateData,
} from "@/lib/firestore";
import { toNanosecond } from "@/lib/constants";
import dayjs from "dayjs";

export const TableAgenda = () => {
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

  const [refresh, setRefresh] = useState(false);
  const [input, setInput] = useState({});
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
      const data = await getAllBerita("agenda");
      setCollectionData(data.reverse());
    };
    fetchData();
  }, [refresh]);

  const headCell = [
    { id: "agenda", label: "Agenda" },
    { id: "tanggal", label: "Tanggal" },
    { id: "action", label: "Action" },
  ];

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInsertAgenda = async () => {
    try {
      await agendaSchema.validate(input);

      const insert = Promise.all([addData(input, "agenda")]);
      await toast
        .promise(insert, {
          loading: "Menyimpan berita...",
          success: "Berita berhasil disimpan",
          error: "Gagal menyimpan berita",
        })
        .then(() => {
          onCloseTambah();
          setInput({});
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error(error.message);
      setInput({});
    }
  };

  const handleDeleteAgenda = async (id) => {
    try {
      await deleteAgenda(id);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUbahAgenda = (data) => {
    try {
      if (data.tanggal instanceof ZonedDateTime)
        data.tanggal = data.tanggal.toDate();

      const update = Promise.all([
        updateData(
          data.id,
          {
            agenda: data.agenda,
            tanggal: data.tanggal,
            informasi: data.informasi,
          },
          "agenda"
        ),
      ]);
      toast
        .promise(update, {
          loading: "Mengubah berita...",
          success: "Berita berhasil diubah",
          error: "Gagal mengubah berita",
        })
        .then(() => {
          onCloseUbah();
          setRefresh(!refresh);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(collectionData);
  console.log(input);
  return (
    <div className="mx-6">
      <div className="my-3 w-full">
        <div className="border-b border-b-green-300 mb-4">
          <p className="text-xl font-light text-green-700 mb-2">
            DASHBOARD{" "}
            <strong className="text-green-800 font-bold">AGENDA</strong>
          </p>
          <div className="bg-green-600 h-1 w-32"></div>
        </div>
      </div>

      <div className="w-full my-3 flex justify-end">
        <Button
          color="success"
          size="md"
          variant="flat"
          onPress={() => {
            setInput({
              tanggal: now(getLocalTimeZone()).toDate(),
            });
            onOpenTambah();
          }}
          className="shadow-sm"
        >
          Tambah Agenda
        </Button>
        <ModalTambah
          isOpen={isOpenTambah}
          onOpenChange={onOpenChangeTambah}
          input={input}
          setInput={setInput}
          handleChange={handleChangeInput}
          insertAgenda={handleInsertAgenda}
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
              let date = toNanosecond(data.tanggal);
              let convertedDate = dayjs(date).format("DD MMMM YYYY HH:mm:ss");
              return (
                <TableRow key={index}>
                  <TableCell>{data.agenda}</TableCell>
                  <TableCell>{convertedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <div
                        onClick={() => {
                          setInput({
                            agenda: data.agenda,
                            tanggal: parseAbsoluteToLocal(
                              dayjs(date).toISOString()
                            ),
                            informasi: data.informasi ? data.informasi : "",
                            id: data.id,
                          });
                          onOpenUbah();
                        }}
                        className="p-2 border rounded-md border-orange-200 hover:bg-orange-100 transition duration-300 active:bg-orange-200"
                      >
                        <MdModeEdit className="text-orange-500" />
                      </div>
                      <div className="p-2 border rounded-md border-red-300 hover:bg-red-50 transition duration-300 active:bg-red-100">
                        <MdDelete
                          className="text-red-500"
                          onClick={() => handleDeleteAgenda(data.id)}
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
      <ModalUbah
        isOpen={isOpenUbah}
        onOpenChange={onOpenChangeUbah}
        input={input}
        handleChange={handleChangeInput}
        updateAgenda={() => handleUbahAgenda(input)}
      />
    </div>
  );
};
