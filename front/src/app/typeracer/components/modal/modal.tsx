import { InfoModalProps } from "@/app/types/modal";


export function InfoModal(props: InfoModalProps) {
  const {
    onClose,
    modalData: { visible, title, content }
  } = props;

  return (
    visible && (
      <>
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className="flex flex-col items-center">
              <div className="text-2xl">{title}</div>
              <div>{content}</div>
              <br />
              <button
                onClick={onClose}
                type="button"
                className="bg-red-500 text-white p-2 "
              >
                Continue
              </button>
            </div>
          </div>
        </dialog>
      </>
    )
  );
}
