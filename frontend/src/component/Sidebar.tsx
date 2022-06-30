import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { useSearchParams, useParams } from "react-router-dom";
import IPostCagetory from "../types/PostCategory";
import ListGroup from "react-bootstrap/ListGroup";
import useInputState from "../hook/useInputState";
import useToggle from "../hook/useToggle";
import PostCategoryService from "../service/postCategory.service";
import {ICategoryEnum} from "../reducers/categorylist.reducer";
import {CategoriesContext, CategoriesDispatchContext} from "../contexts/categorylist.context"
import { useQueryParam, StringParam } from 'use-query-params';
import "./Sidebar.css";
import CategoryItem from "./SidebarCategoryItem";

export default function Sidebar(props: any) {
  const [inputValue, handleInputChange, resetInputValue] = useInputState("");
  const [isEditMode, toggleIsEditMode] = useToggle(false);

  const currentUser = useContext(UserContext);

  // 카테고리 디스패치
  const postCategories = useContext(CategoriesContext);
  const categoriesDispatch = useContext(CategoriesDispatchContext);

  const [author, setAuthor] = useState<string | undefined>(undefined);
  let { authorId } = useParams();
  const [, setCurCategory] = useQueryParam('category', StringParam);

  const deletePostCategory = async (categoryId: string) => {
    await PostCategoryService.deleteOne(categoryId);
    retrievePostCategories();
  };

  const retrievePostCategories = async () => {
    setAuthor(authorId);
    if (!authorId) {
      categoriesDispatch?.({type: ICategoryEnum.REMOVE_ALL});
    }
    PostCategoryService.findByUserId(authorId || "")
      .then((response) => {
        // console.log("post cate List: ", response.data);
        categoriesDispatch?.({type: ICategoryEnum.UPDATE, list: response.data});

      })
      .catch((e: Error) => {
        categoriesDispatch?.({type: ICategoryEnum.REMOVE_ALL});
        // console.log(e);
      });
  };

  if (authorId != author) {
    retrievePostCategories();
  }

  useEffect(() => {
    // console.log("currentUser: ", currentUser);
    // console.log("useEffect");
    retrievePostCategories();
  }, []);

  return (
    <ListGroup className={`${props.className} sidebar`}>
      <CategoryItem
        key="all"
        className="categoryAll category-list-item"
        isEditable={false}
        title="전체 게시글"
      ></CategoryItem>
      <>
        {postCategories &&
          postCategories.map((category, index) => (
            <CategoryItem
              isEditable={true}
              category={category}
              title={category.title}
              key={category.id}
              categoryId={category.id}
              deletePostCategory={deletePostCategory}
              hadleClicked={setCurCategory}
            />
          ))}
      </>
      <>
        {/* {postCategories &&
          postCategories.map((category, index) =>
            console.log("category: ", category)
          )} */}
      </>

      { currentUser && (currentUser.username == authorId ) ?
          isEditMode ? (
          <ListGroup.Item className="addBtn" key="addEditBtn">
            <div>게시글 분류 추가</div>
            <input
              className="inputBtn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onChange={handleInputChange}
              value={inputValue}
            />
            <div className="btnList">
              <button
                type="button"
                className="btn btn-success"
                onClick={async () => {
                  await PostCategoryService.create({ title: inputValue });
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
                onClick={() => {
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
        ) : (<></>)
      }
    </ListGroup>
  );
}
