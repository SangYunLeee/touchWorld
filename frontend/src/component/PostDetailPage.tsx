import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import PostDataService from "../service/post.service";
import AuthService from "../service/auth.service";
import CommentService from "../service/comment.service";
import IPostData from "../types/Post";
import useNavigateDefault from "../helper/useNavigateDefault";
import useInputState from "../hook/useInputState";

import "react-quill/dist/quill.snow.css";
import "./QuillEditor.css";
import "./DefaultPost.css";
import IComment from "../types/CommentType";
import CommentList from "./CommentList"

const c_newPost_container =
  "PostLayout border bg-gray p-3 DefaultMainContext d-flex justify-content-end flex-wrap";
const c_newPost_container_title = "d-block text-center";
const c_newPost_container_form = "w-100 position-relative";
const c_newPost_container_form_update_btn = "btn btn-secondary btn-sm";
const c_newPost_container_form_delete_btn = "btn btn-danger btn-sm me-2";

export default function PostDetailPage(props) {
  const currentUser = AuthService.getCurrentUser();
  const [commentForAdd, handleCommentChange, resetCommentValue] =
    useInputState("");
  const { postId } = props;
  const initialPostState: IPostData = new IPostData({
    id: "",
    title: "...",
    description: "...",
    author: {
      id: "...",
      username: "...",
    },
  });

  const [post, setPost] = useState<IPostData>(initialPostState);
  const navigateDefault = useNavigateDefault();

  const moduleConfig = {
    toolbar: false,
  };

  function retrievePost() {
    PostDataService.get(postId)
      .then((response) => {
        console.log("post: ", response.data);
        setPost(new IPostData(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log("useEffect");
    retrievePost();
  }, [postId]);

  const handleDelete = () => {
    PostDataService.remove(post.id)
      .then((response: any) => {
        navigateDefault("/")();
      })
      .catch((e) => {
        console.log(e);
      });
  };



  return (
    <div className={c_newPost_container}>
      <h5 className={c_newPost_container_title} style={{ flexBasis: "100%" }}>
        {post.title}
      </h5>

      <div className="mb-1 ms-1"></div>
      <i className="bi bi-person-fill" style={{ flexGrow: "5" }}>
        {" "}
        {post.author?.username}{" "}
      </i>
      <i className="bi bi-calendar-week ms-3 small me-2 mb-2">
        {" "}
        {post.localTime()}
      </i>

      <div className="input-group mb-3 input-group-sm">
        <span className="input-group-text">분류</span>
        <span className="form-control">
          {post?.category?.title || "전체 게시글"}
        </span>
      </div>

      <div className={c_newPost_container_form}>
        <div className="mb-3">
          <ReactQuill
            readOnly={true}
            modules={moduleConfig}
            className="min-h-300"
            theme="snow"
            value={post.description}
          />
        </div>
      </div>

      {/* 코멘트 */}
      <CommentList comments={post.comments} />

      {/* 코멘트 추가*/}
      {currentUser && (
        <div className="comment w-100">
          <div className="input-group mb-3 input-group-sm">
            <textarea
              className="form-control"
              placeholder="코멘트를 달아보아요 (현재 코멘트 달기가 불안정하여 언제든 코멘트가 삭제될 수 있어 양해 부탁드립니다)"
              aria-label=""
              style={{ height: "2rem", minHeight: "2rem" }}
              onChange={handleCommentChange}
              value={commentForAdd}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              style={{ width: "60px" }}
              onClick={() => {
                CommentService.create({ text: commentForAdd, postId: post.id })
                  .then(()=>{
                    retrievePost();
                  });
                resetCommentValue();
              }}
            >
              추가
            </button>
          </div>
        </div>
      )}

      {/* 삭제 및 수정 버튼 */}
      <p className="p-0 m-0 position-relative" style={{ height: "2.0rem" }}>
        {(!post.author ||
          (post.author &&
            !!currentUser &&
            currentUser.id === post.author.id)) && [
          <button
            className={c_newPost_container_form_delete_btn}
            style={{ alignSelf: "flex-end" }}
            onClick={handleDelete}
            key="delete"
          >
            삭제
          </button>,
          <button
            className={c_newPost_container_form_update_btn}
            style={{ alignSelf: "flex-end" }}
            onClick={navigateDefault(`/post/edit/${post.id}`)}
            key="update"
          >
            수정하기
          </button>,
        ]}
      </p>
    </div>
  );
}
