import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import PostDataService from "../service/post.service";
import 'react-quill/dist/quill.snow.css';
const c_newPost = "container-fluid"
const c_newPost_container = "col-xs-12 col-sm-10 col-md-8 col-lg-6 col-12 mx-auto py-3 mw-600 border bg-gray"
const c_newPost_container_title = "d-block text-center"
const c_newPost_container_form = "w-100 position-relative"
const c_newPost_container_form_btn = "btn btn-success position-absolute"

export default function NewPost(props) {
  const {postId, isEditMode} = props;
  let navigate = useNavigate();
  const initialPostState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [post, setPost] = useState(initialPostState);
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
    (isEditMode?  PostDataService.update(postId, data) :
                  PostDataService.create(data)
    )
      .then(response => {
        navigate(`/post/${response.data.id}`);
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (isEditMode)
      retrievePosts();
  }, []);

  const retrievePosts = () => {
    PostDataService.get(postId)
      .then(response => {
        setPost(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };

  return (
    <div className={c_newPost}>
      <div className='row'>
        <div className={c_newPost_container}>
            <div className={c_newPost_container_form}>
                <div className="mb-3">
                    <input className="form-control sh-n" type="text" id="title" name="title" value={post.title} required onChange={handleInputChange} />
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
