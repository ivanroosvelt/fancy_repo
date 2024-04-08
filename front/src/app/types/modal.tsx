export interface ModalData {
  visible: boolean;
  title?: string;
  content?: string;
}

export interface InfoModalProps {
  onClose: () => void;
  modalData: ModalData;
}
