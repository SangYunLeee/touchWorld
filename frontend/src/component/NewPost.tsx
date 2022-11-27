import React, { useState, useEffect, useRef, useContext } from "react";
import ReactQuill from "react-quill";
import { useQueryParam, StringParam } from "use-query-params";
import PostDataService from "../service/post.service";
import "react-quill/dist/quill.snow.css";
import {CategoriesContext} from "../contexts/categorylist.context"
import IPost from "../types/Post"
import Select from "react-validation/build/select";
import useNavigateDefault from "../helper/useNavigateDefault";
const c_newPost_container_form = "border bg-gray p-3";
const c_newPost_container_form_btn = "btn btn-success position-absolute";

export default function NewPost(props: any) {
  const postCategories = useContext(CategoriesContext);
  const [curCategory] = useQueryParam("category", StringParam);
  const select = useRef<Select>();
  const { postId, isEditMode } = props;
  let navigateDefault = useNavigateDefault();
  const initialPostState = new IPost({
    id: null as any,
    title: "",
    description: "",
  });
  const [post, setPost] = useState<IPost>(initialPostState);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
    const { name="", value="" } = event.target;
    setPost(new IPost({ ...post, [name]: value }));
  };

  const setEditorValue = (text: string) => {
    post.description = text;
  };

  const savePost = () => {
    (isEditMode
      ? PostDataService.update(postId, post)
      : PostDataService.create(post)
    )
      .then((response: any) => {
        navigateDefault(`/post/${response.data.id}`)();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    const retrievePosts = () => {
      PostDataService.get(postId)
        .then((response) => {
          setPost(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    if (isEditMode) {
      retrievePosts();
    }
    if (curCategory) {
      select.current.value = curCategory;
    }

  }, []);

  return (
    <div
      className={c_newPost_container_form}
      style={{ width: "500px", textAlign: "center" }}
    >
      <h5 className="mb-3">{isEditMode ? "글 수정하기" : "새 글 쓰기"}</h5>

      <div className="mb-3 input-group">
        <input
          className="form-control sh-n"
          type="text"
          id="title"
          name="title"
          value={post.title}
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="category-input-list input-group mb-3 ">
        <label className="input-group-text sh-n" htmlFor="categoryList">
          분류
        </label>
        <select
          className="form-select sh-n py-0"
          id="categoryList"
          name='category'
          ref={select}
          onChange={(e) => {
            handleInputChange(e)
          }}
        >
          <option value="" key="defalut">{(post.category && post.category!.title) || "전체 게시글"}</option>
          {
            !isEditMode && postCategories?.map((category, index) => (
              <option value={category.id} key={index}>{category.title}</option>
            ))
          }
        </select>
      </div>

      <div className="mb-3">
        <ReactQuill
          className="min-h-300"
          theme="snow"
          value={post.description}
          onChange={setEditorValue}
        />
      </div>
      <p className="p-0 m-0 position-relative" style={{ height: "2.0rem" }}>
        <button
          className={c_newPost_container_form_btn}
          style={{ right: "0px" }}
          onClick={savePost}
        >
          저장이다냥
        </button>
      </p>
    </div>
  );
}
