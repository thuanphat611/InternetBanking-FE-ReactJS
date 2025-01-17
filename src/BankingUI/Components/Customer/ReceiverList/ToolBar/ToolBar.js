import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./ToolBar.css";

const ToolBar = ({
  handleShowFormModal,
  setModalFormVariables,
  modalFormVariables,
  setWorkingReceiver,
}) => {
  const handleClick = () => {
    setWorkingReceiver({
      savedName: "",
      bankId: -1,
      accountNumber: "",
      name: "",
    });
    handleShowFormModal(true);
  };
  return (
    <>
      <span>YOUR RECEIVERS LIST</span>
      <span>
        <Button onClick={handleClick}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </span>
    </>
  );
};

export default ToolBar;
