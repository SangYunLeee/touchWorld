import React from 'react'
import IComment from "../types/CommentType";

export default function CommentItemList(props) {
  const {comments} = props;

  const CommentItem = (props: any) => {
    let commentObj = new IComment(props.comment);
    console.log("commentObj: ", commentObj);
    console.log("props: ", props);
    return (
      <div
          className="w-100 border mb-2 p-2"
          key={commentObj.id}
          style={{borderRadius:'4px'}}
        >
          <i className="bi bi-person-fill ms-2">
          {" "}
          {commentObj.author.username}{" "}
          </i>
          <div className='ms-2'>
            {commentObj.text}
          </div>
          <i className="bi bi-calendar-week small ms-2">
          {" "}
          {commentObj.localTime()}
          </i>
        </div>
    );
  };

  return (
    <div className='w-100'>
      <div className='ms-2 mb-1'> {`댓글`} </div>
      {Array.isArray(comments) &&
        comments?.map((comment, index) => (<CommentItem comment={comment} key={comment.id} />))
      }
    </div>
  );
}