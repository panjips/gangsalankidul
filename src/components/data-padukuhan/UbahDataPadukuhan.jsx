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
} from "@nextui-org/react";

export const ModalDataPadukuhan = ({
  isOpen,
  onOpenChange,
  input,
  handleChange,
  updateData,
}) => {
  return (
    <>
      <Modal
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
                Ubah Data Padukuhan
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    type="text"
                    variant="bordered"
                    label="Nama"
                    name="nama"
                    value={input.nama ? input.nama : ""}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    variant="bordered"
                    label="Jumlah"
                    name="jumlah"
                    value={input.jumlah ? input.jumlah : ""}
                    onChange={handleChange}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button
                  color="warning"
                  className="text-white"
                  onPress={updateData}
                >
                  Ubah
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
