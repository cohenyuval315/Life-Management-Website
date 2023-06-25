import './Alert.css'
import { useState } from "react";
import React from "react";

export default function Alert({ children, type,visible ,onClose, message }) {

  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose&&onClose();
  };

  return (
    <div className={["alert",type].join(" ")}>
      <span className={"closebtn"} onClick={handleClose}>
            close
      </span>
      {message}
    </div>
  );
}