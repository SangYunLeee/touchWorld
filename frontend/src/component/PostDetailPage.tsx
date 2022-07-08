import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import PostDataService from "../service/post.service";
import AuthService from "../service/auth.service";
import IPostData from "../types/Post";

import "react-quill/dist/quill.snow.css";
import "./QuillEditor.css";
import "./DefaultPost.css";

const c_newPost_container = "PostLayout border bg-gray p-3 DefaultMainContext";
const c_newPost_container_title = "d-block text-center";
const c_newPost_container_form = "w-100 position-relative";
const c_newPost_container_form_update_btn = "btn btn-secondary position-absolute btn-sm";
const c_newPost_container_form_delete_btn = "btn btn-danger position-absolute btn-sm";

export default function PostDetailPage(props) {
  let navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const { postId } = props;
  const initialPostState: IPostData = new IPostData({
    id: "",
    title: "...",
    description: "...",
    author: {
      id: "...",
      username: "..."
    }
  });

  const [post, setPost] = useState<IPostData>(initialPostState);

  const moduleConfig = {
    toolbar: false,
  };

  useEffect(() => {
    console.log("useEffect");
    const retrievePosts = () => {
      PostDataService.get(postId)
        .then((response) => {
          setPost(new IPostData(response.data));
        })
        .catch((e) => {
          console.log(e);
        });
    };
    retrievePosts();
  }, [postId]);

  const handleDelete = () => {
    PostDataService.remove(post.id)
      .then((response: any) => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEdit = () => {
    navigate(`/post/edit/${post.id}`);
  };

  return (
    <div className={c_newPost_container}>
      <h5 className={c_newPost_container_title}>{post.title}</h5>
      <div className='mb-1 ms-1'> <i className="bi bi-person-fill"> </i>
        {post.author?.username} <i className="bi bi-calendar-week ms-3"> {post.localTime()}</i></div>
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
        <p className="p-0 m-0" style={{ height: "2.0rem" }}>
          {(!post.author ||
            (post.author &&
              !!currentUser &&
              currentUser.id === post.author.id)) && [
            <button
              className={c_newPost_container_form_update_btn}
              style={{ right: "0px" }}
              onClick={handleEdit}
              key="update"
            >
              수정하기
            </button>,
            <button
              className={c_newPost_container_form_delete_btn}
              style={{ right: "100px" }}
              onClick={handleDelete}
              key="delete"
            >
              삭제
            </button>,
          ]}
        </p>
      </div>
    </div>
  );
}
