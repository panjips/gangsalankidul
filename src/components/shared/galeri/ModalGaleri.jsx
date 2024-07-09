import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Image,
} from "@nextui-org/react";

export const ImageModal = ({ isOpen, onOpenChange, src, judul }) => {
  return (
    <Modal
      size="2xl"
      backdrop="blur"
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-0">
              <Image src={src} fill alt="image" />
            </ModalBody>
            <ModalFooter>
              <div className="w-full">
                <p className="text-center text-sm">{judul}</p>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
