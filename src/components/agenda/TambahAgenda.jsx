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

export const ModalAgenda = ({
  isOpen,
  onOpenChange,
  input,
  handleChange,
  insertAgenda,
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
                Tambah Agenda
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    type="text"
                    variant="bordered"
                    label="Agenda"
                    name="agenda"
                    value={input.agenda ? input.agenda : ""}
                    onChange={handleChange}
                  />
                  <DatePicker
                    size="lg"
                    label="Tanggal"
                    variant="bordered"
                    name="tanggal"
                    onChange={(date) => {
                      handleChange({
                        target: {
                          name: "tanggal",
                          value: date.toDate(),
                        },
                      });
                    }}
                    defaultValue={now(getLocalTimeZone())}
                  />
                  <Textarea
                    label="Informasi Tambahan"
                    variant="bordered"
                    disableAnimation
                    disableAutosize
                    name="informasi"
                    classNames={{
                      input: "resize-y min-h-[40px]",
                    }}
                    onChange={handleChange}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={insertAgenda}>
                  Tambah
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
