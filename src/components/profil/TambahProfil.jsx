import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { RichTextEditor } from "@/components/form/quill/RichTextEditor";

export const ModalProfil = ({
  isOpen,
  onOpenChange,
  input,
  setInput,
  action,
  insertProfil,
}) => {
  return (
    <>
      <Modal
        size="5xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        placement="center"
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {action} Informasi Profil
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col gap-4">
                  <Input
                    type="text"
                    variant="bordered"
                    label="Judul"
                    name="judul"
                    value={input.judul ? input.judul : ""}
                    onChange={(e) =>
                      setInput((prev) => ({ ...prev, judul: e.target.value }))
                    }
                    isDisabled={
                      action === "Ubah" &&
                      (!input.judul.includes("Tentang Padukuhan") &&
                      !input.judul.includes("Sejarah Padukuhan")
                        ? false
                        : true)
                    }
                  />
                  <RichTextEditor value={input} setValue={setInput} />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setInput({});
                  }}
                >
                  Batal
                </Button>
                <Button color="primary" onPress={insertProfil}>
                  {action}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
