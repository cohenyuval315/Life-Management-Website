import React,{useEffect,useRef} from "react";
import { createPortal } from "react-dom";
import './Modal.css'
import { Icons } from "../../assets/index.js";
import useOutsideClick from "../../hooks/useOutsideClick";
import useEscapeKey from "../../hooks/useEscapeKey";


function Modal({title,handleModal,handleSubmit,data,handleValidation,children}) {

  useEscapeKey(close)
  const ref = useRef();
  useOutsideClick(close,ref)


  function close() {
    handleModal(false);
  }

  function submit() {
    if(!handleValidation(data)){
      return 
    }
    handleSubmit(data)
    close();
  }

  return (
    createPortal(
      <>
        <div id="modal-container">
          <div id='modal-items-container' ref={ref}>
            <div id="modal-header" >
                {title?title:"no title"}
            </div>
            <div id="modal-body">
                {children}
            </div>
          </div>
        </div>
        <button id="modal-close-button" onClick={close}>
            {Icons.Xmark}
        </button>
      </>,
     document.getElementById('modal-root')
    )
  );
}

export default Modal