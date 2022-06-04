import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import PostDataService from "../service/post.service";
import 'react-quill/dist/quill.snow.css';
const c_newPost_container_form = "border bg-gray p-3"
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
    const retrievePosts = () => {
      PostDataService.get(postId)
        .then(response => {
          setPost(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };

    if (isEditMode)
      retrievePosts();
  }, [isEditMode, postId]);

  return (
            <div className={c_newPost_container_form} style={{width: "500px"}}>
                <div className="mb-3">
                    <input className="form-control sh-n" type="text" id="title" name="title" value={post.title} required onChange={handleInputChange} />
                </div>
                <div className="mb-3" >
                <ReactQuill className='min-h-300' theme="snow" value={post.description} onChange={setEditorValue}/>
                </div>
                <p className='p-0 m-0 position-relative' style={{height: "2.0rem"}}>
                    <button className={c_newPost_container_form_btn} style={{right: "0px"}}
                    onClick={savePost}>저장이다냥</button>
                </p>
            </div>
  )
}
