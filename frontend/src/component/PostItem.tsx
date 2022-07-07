import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {stripTags} from '../helper';
import IPostData from "../types/Post"
import catImg from "../asset/cat_noimage.jpg";
import { useQueryParam, StringParam } from 'use-query-params';
import "./PostItem.css";

const c_postitem = "postitem mb-2 mx-auto myCursor normal-max-width";
const c_postitem_item = "d-flex justify-content-center";
const c_postitem_item_textArea = "hover-grey card col-xs-10 col-md-10 col-9";
const c_postitem_item_imgContainer =
  "border col-xs-2 col-md-2 col-3 d-flex align-items-center justify-content-center p-0";
const c_postitem_item_imgContainer_img = "img-fluid text-center";

export default function PostItem(props) {
  let navigate = useNavigate();
  const location = useLocation();
  const post : IPostData = props.post;
  const {title, description, id, author} = post;

  let handleClick = () => {
    let prefix = location.pathname;
    if (location.pathname == "/") {
      prefix = ""
    }
    if (author?.username) {
      prefix = `/author/${author.username}`
    }
    navigate(`${prefix}/post/${id}${location.search}`);
  };
  return (
    <div
      className={c_postitem}
      style={{ maxHeight: "200px" }}
      onClick={handleClick}
    >
      <div className={c_postitem_item}>
        <div
          className={c_postitem_item_imgContainer}
          style={{ maxWidth: "120px", borderRadius: "5px" }}
        >
          <img
            className={c_postitem_item_imgContainer_img}
            style={{ width: "auto", maxHeight: "60px"}}
            src={catImg}
            alt="Card cap"
          />
        </div>
        <div className={c_postitem_item_textArea}>
          <div className="card-body">
            <h6 className="card-title"> {title}</h6>
            <p className="card-text mh-25 text-truncate d-block ">
            {stripTags(description)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
