import React, {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import IPostCagetory from "../types/PostCategory";
import ListGroup from "react-bootstrap/ListGroup";
import useInputState from "../hook/useInputState";
import useToggle from "../hook/useToggle";
import PostCategoryService from "../service/postCategory.service";
import AuthService from "../service/auth.service";
import "./Sidebar.css";
import CategoryItem from "./SidebarCategoryItem"

export default function Sidebar(props: any) {
  const [inputValue, handleInputChange, resetInputValue] = useInputState("");
  const [isEditMode, toggleIsEditMode] = useToggle(false);
  const [postCategories, setPostCategories] = useState<Array<IPostCagetory>>();
  var currentUser = AuthService.getCurrentUser();

  const deletePostCategory = async (categoryId : string) => {
    await PostCategoryService.deleteOne(categoryId);
    retrievePostCategories();
  }

  const retrievePostCategories = async () => {
    if (!currentUser) {
      return;
    }
    PostCategoryService.findByUserId(currentUser?.id || "")
      .then(response => {
        console.log("post cate List: ", response.data);
        setPostCategories(response.data);
      })
      .catch((e: Error) => {
        setPostCategories(undefined);
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
    >
      <CategoryItem
        key="all"
        className='categoryAll category-list-item'
        isEditable={false}
        title="전체 게시글"
      >
      </CategoryItem>
      <>
      {postCategories && postCategories.map((category, index) => (
        <CategoryItem
          isEditable={true}
          category={category}
          title={category.title}
          key={category.id}
          categoryId={category.id}
          deletePostCategory={deletePostCategory}
        />
      ))}
      </>
      <>
      {postCategories && postCategories.map((category, index) => (
        console.log("category: ", category)
      ))
      }
      </>

      {isEditMode ? (
        <ListGroup.Item className="addBtn" key="addEditBtn">
          <div>
            게시글 분류 추가
          </div>
          <input
            className='inputBtn'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onChange={handleInputChange}
            value={inputValue}
          />
          <div
            className='btnList'
          >
            <button type="button" className="btn btn-success"
              onClick={ async () => {
                await PostCategoryService.create({title: inputValue});
                retrievePostCategories();
                resetInputValue();
                toggleIsEditMode();
              }}
            >
              추가
            </button>
            <button
              type="button"
              className="btn btn-secondary"
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
          key="addBtn"
          className="addBtn myCursor"
          onClick={toggleIsEditMode}
        >
          카테고리 추가 +
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}