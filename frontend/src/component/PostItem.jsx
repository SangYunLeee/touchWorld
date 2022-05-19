import React from "react";
import catImg from "../asset/cat_noimage.jpg";

const c_postitem = "container mb-2 mx-auto myCursor normal-max-width";
const c_postitem_item = "row d-flex justify-content-center";
const c_postitem_item_textArea = "hover-grey card col-xs-10 col-md-10 col-9";
const c_postitem_item_imgContainer =
  "border col-xs-2 col-md-2 col-3 d-flex align-items-center justify-content-center p-0";
const c_postitem_item_imgContainer_img = "img-fluid text-center";

export default function PostItem() {
  return (
    <div
      className={c_postitem}
      style={{ maxHeight: "200px" }}
      onclick="location.href='/post';"
    >
      <div className={c_postitem_item}>
        <div
          className={c_postitem_item_imgContainer}
          style={{ maxWidth: "120px" }}
        >
          <img
            className={c_postitem_item_imgContainer_img}
            style={{ width: "auto", maxHeight: "100px" }}
            src={catImg}
            alt="Card image cap"
          />
        </div>
        <div className={c_postitem_item_textArea}>
          <div className="card-body">
            <h5 className="card-title"> title</h5>
            <p className="card-text mh-25 text-truncate d-block ">
              image description
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
