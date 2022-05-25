import React from 'react'
import QuillEditor from './QuillEditor';
const c_newPost = "container-fluid"
const c_newPost_container = "col-xs-12 col-sm-10 col-md-8 col-lg-6 col-12 mx-auto py-3 mw-600 border bg-gray"
const c_newPost_container_title = "d-block text-center"
const c_newPost_container_form = "w-100 position-relative"
const c_newPost_container_form_btn = "btn btn-success position-absolute"

export default function NewPost() {
  return (
    <div className={c_newPost}>
      <div className='row'>
        <div className={c_newPost_container}>
            <h4 className={c_newPost_container_title}>새로 만들거냥?</h4>
            <form action="/post" method="POST" className={c_newPost_container_form}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">제목</label>
                    <input className="form-control sh-n" type="text" id="title" name="title" required />
                </div>
                <div className="mb-3" style={{height: "40vh"}}>
                  <QuillEditor/>
                </div>
                <p className='p-0 m-0' style={{height: "2.0rem"}}>
                    <button className={c_newPost_container_form_btn} style={{right: "0px"}}>저장이다냥</button>
                </p>
            </form>
        </div>
      </div>
    </div>
  )
}
