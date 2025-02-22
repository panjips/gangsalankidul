import React from "react";
import { now, getLocalTimeZone } from "@internationalized/date";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  DatePicker,
  Textarea,
} from "@nextui-org/react";
import { MdImage, MdClose } from "react-icons/md";
import Image from "next/image";
import * as yup from "yup";
import toast from "react-hot-toast";

export const ModalGambar = ({
  isOpen,
  onOpenChange,
  input,
  action,
  setInput,
  handleInsert,
}) => {
  const handleChange = async (e) => {
    if (e.target.name === "image") {
      const imageSchema = yup.object().shape({
        image: yup
          .mixed()
          .test(
            "fileType",
            "File gambar harus bertipe (jpg/jpeg/png)",
            (value) => {
              if (!value) return true;
              return ["image/jpg", "image/jpeg", "image/png"].includes(
                value.type
              );
            }
          )
          .test("fileSize", "Gambar tidak boleh lebih dari 1MB", (value) => {
            if (!value) return true;
            return value.size <= 1048576;
          }),
      });

      try {
        await imageSchema.validate({ image: e.target.files[0] });
        setInput((prev) => ({
          ...prev,
          [e.target.name]: [...prev.image, e.target.files[0]],
        }));
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <>
      <Modal
        size="4xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action === "edit" ? "Edit Galeri" : "Tambah Galeri"}
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    type="text"
                    variant="bordered"
                    label="Judul"
                    name="judul"
                    value={input.judul ? input.judul : ""}
                    onChange={handleChange}
                  />
                  <div className="col-span-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
                    {input.image?.map((image, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center relative h-32 lg:h-48 rounded-lg overflow-hidden border border-default-200 shadow-sm"
                      >
                        <div
                          onClick={() => {
                            input.image.splice(index, 1);
                            setInput((prev) => ({ ...prev }));
                          }}
                          className="z-10 absolute right-1 top-1 cursor-pointer"
                        >
                          <MdClose className="text-indigo-500" />
                        </div>
                        <Image
                          priority
                          fill
                          sizes="100%"
                          style={{
                            objectFit: "cover",
                            borderRadius: 7,
                          }}
                          src={
                            typeof image == "string"
                              ? image
                              : URL.createObjectURL(image)
                          }
                          alt="foto_produk"
                        />
                      </div>
                    ))}
                    <label className="w-full h-32 lg:h-48 border-2 border-default-200 shadow-sm rounded-lg border-dashed flex justify-center items-center flex-col">
                      <MdImage size={36} className="text-gray-300" />
                      <div
                        className="flex justify-center
            items-center flex-col"
                      >
                        <p className="text-gray-500 text-[6px]">
                          <span className="font-bold text-indigo-600 cursor-pointer">
                            Unggah
                          </span>{" "}
                          lampiran format
                        </p>
                        <p className="text-gray-500 text-[6px]">
                          jpg, jpeg, or png.
                        </p>
                      </div>
                      <input
                        type="file"
                        className="sr-only"
                        name="image"
                        id="image"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color={action === "edit" ? "default" : "primary"}
                  onPress={handleInsert}
                >
                  {action === "edit" ? "Edit" : "Tambah"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
