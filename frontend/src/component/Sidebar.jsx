import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useInputState from "../hook/useInputState";
import useToggle from "../hook/useToggle";
import "./Sidebar.css";

export default function Sidebar(props) {
  const [inputValue, handleInputChange, resetInputValue] = useInputState("");
  const [isEditMode, toggleIsEditMode] = useToggle(false);

  return (
    <ListGroup
      className={`${props.className} sidebar`}
      style={{ width: "240px" }}
    >
      <ListGroup.Item>전체 게시글</ListGroup.Item>
      {isEditMode ? (
        <ListGroup.Item className="addBtn " style={{ textAlign: "center" }}>
          <input
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={handleInputChange}
            value={inputValue}
            style={{ width: "100%" }}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button type="button" className="btn btn-success">
              추가
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick= {() => {
                resetInputValue();
                toggleIsEditMode();
              }}
            >
              취소
            </button>
          </div>
        </ListGroup.Item>
      ) : (
        <ListGroup.Item
          className="addBtn myCursor"
          style={{ textAlign: "center" }}
          onClick={toggleIsEditMode}
        >
          추가 +
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}