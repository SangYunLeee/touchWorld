import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import useToggle from "../hook/useToggle";
import { useNavigate, useParams, createSearchParams } from "react-router-dom";

export default function SidebarCategoryItem(props) {
  const { title, deletePostCategory, category, isEditable, isSelected } = props;
  const [isEditMode, toggleIsEditMode] = useToggle(false);
  const navigate = useNavigate();
  let { authorId } = useParams();

  return (
    <ListGroup.Item className={`category-list-item d-flex ${isSelected && "selected"}`}>
      <span
        className="category-text d-inline-block w-100 text-truncate"
        onClick={() => {
          let params = {};
          let pathname = "/";
          if (category) {
            params["category"] = category.id;
          }
          if (authorId) {
            pathname = `/author/${authorId}`;
          }
          navigate({ pathname, search: `?${createSearchParams(params)}` });
        }}
      >
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
      {isEditMode && (
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
      )}
    </ListGroup.Item>
  );
}
