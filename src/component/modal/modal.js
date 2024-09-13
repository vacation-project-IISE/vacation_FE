import { useRef } from "react";
import styles from "./modal.css";

function Modal({ setModalOpen, text, img }) {
  const modalBackground = useRef();
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="ModalContainer"
      ref={modalBackground}
      onClick={e => {
        if (e.target === modalBackground.current) {
          setModalOpen(false);
        }
      }}>
      <div className="ModalContent">
        <img src={img} alt="modalImg" className="ModalImg"></img>
        {text}
        <button className="ModalCloseBtn" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}
export default Modal;
