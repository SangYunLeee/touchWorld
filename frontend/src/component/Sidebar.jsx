import React, {useState, useEffect} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import useInputState from "../hook/useInputState";
import useToggle from "../hook/useToggle";
import PostCategoryService from "../service/postCategory.service";
import AuthService from "../service/auth.service";
import "./Sidebar.css";

export default function Sidebar(props) {
  const [inputValue, handleInputChange, resetInputValue] = useInputState("");
  const [isEditMode, toggleIsEditMode] = useToggle(false);
  const [postCategories, setPostCategories] = useState("");
  var currentUser = AuthService.getCurrentUser();

  const retrievePostCategories = async () => {
    PostCategoryService.findByUserId(currentUser.id)
      .then(response => {
        console.log("post cate List: ", response.data);
        setPostCategories(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("currentUser: ", currentUser);
    console.log("useEffect")
    retrievePostCategories();
  },[]);

  return (
    <ListGroup
      className={`${props.className} sidebar`}
      style={{ width: "100%", maxWidth: "250px" }}
    >
      <ListGroup.Item>전체 게시글</ListGroup.Item>
      {postCategories && postCategories.map((category, index) => (
        <ListGroup.Item key={index}
          className="text-truncate"
        >
          {category.title}
        </ListGroup.Item>
      ))}
      {isEditMode ? (
        <ListGroup.Item className="addBtn " style={{ textAlign: "center" }}>
          <div style={{marginBottom:"5px"}}>
            게시글 분류 추가
          </div>
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
            <button type="button" className="btn btn-success"
              onClick={ async () => {
                await PostCategoryService.create({title: inputValue});
                retrievePostCategories();
              }}
            >
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