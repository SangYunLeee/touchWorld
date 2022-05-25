import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import PostDataService from "../service/post.service";
import 'react-quill/dist/quill.snow.css';
const c_newPost = "container-fluid"
const c_newPost_container = "col-xs-12 col-sm-10 col-md-8 col-lg-6 col-12 mx-auto py-3 mw-600 border bg-gray"
const c_newPost_container_title = "d-block text-center"
const c_newPost_container_form = "w-100 position-relative"
const c_newPost_container_form_btn = "btn btn-success position-absolute"

export default function NewPost() {
  let navigate = useNavigate();
  const [value, setValue] = useState('');
  const initialPostState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [post, setPost] = useState(initialPostState);
  const [submitted, setSubmitted] = useState(false);
  const handleInputChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const setEditorValue = (text) => {
    setPost({ ...post, description: text });
  }

  const savePost = () => {
    var data = {
      title: post.title,
      description: post.description
    };
    PostDataService.create(data)
      .then(response => {
        navigate("/");
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className={c_newPost}>
      <div className='row'>
        <div className={c_newPost_container}>
            <h4 className={c_newPost_container_title}>새로 만들거냥?</h4>
            <div className={c_newPost_container_form}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">제목</label>
                    <input className="form-control sh-n" type="text" id="title" name="title" required onChange={handleInputChange} />
                </div>
                <div className="mb-3" >
                <ReactQuill className='min-h-300' theme="snow" value={post.description} onChange={setEditorValue}/>
                </div>
                <p className='p-0 m-0' style={{height: "2.0rem"}}>
                    <button className={c_newPost_container_form_btn} style={{right: "0px"}}
                    onClick={savePost}>저장이다냥</button>
                </p>
            </div>
        </div>
      </div>
    </div>
  )
}
