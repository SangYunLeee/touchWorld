import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import useToggle from "../hook/useToggle";

export default function SidebarCategoryItem(props) {
  const { title, deletePostCategory, category, isEditable } = props;
  const [isEditMode, toggleIsEditMode] = useToggle(false);

  return (
    <ListGroup.Item className="category-list-item d-flex">
      <span className="category-text d-inline-block w-100 text-truncate">
        {title}
      </span>
      <i
        className="editBtn bi bi-three-dots-vertical position-absolute d-none "
        onClick={() => {
          if (isEditable) {
            toggleIsEditMode();
          }
        }}
      ></i>
      {
        isEditMode && (
        <div className="btnList">
          <button
            type="button"
            className="btn btn-danger"
            onClick={async () => {
              deletePostCategory(category.id);
            }}
          >
            제거
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (isEditable) {
                toggleIsEditMode();
              }
            }}
          >
            취소
          </button>
        </div>
        )
      }
    </ListGroup.Item>
  );
}
