import { Modal } from "antd";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface ModalProps {
  modalOpen: boolean;
  modalTitle: string;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const ModalMain: React.FC<ModalProps> = ({
  modalOpen,
  modalTitle,
  setModalOpen,
  children,
}) => {
  return (
    <div className={`${modalOpen ? "modal-open" : "modal"}`} id="addModal">
      <div className="modal-box" key={uuidv4()}>
        <Modal
          title={modalTitle}
          open={modalOpen}
          onCancel={() => {
            setModalOpen(false);
          }}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          {children}
        </Modal>
      </div>
    </div>
  );
};
export default ModalMain;
