import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../contexts/user.context";
import IPost from "../types/Post";
import PostDataService from "../service/post.service";
import PostItem from "./PostItem";

export default function PostList(props : {posts}) {
  const {posts} = props;
  let { authorId } = useParams();
  let navigate = useNavigate();
  const location = useLocation();
  const currentUser = useContext(UserContext);

  return (
    // 포스트 리스트
    <div className="position-relative " style={{width: "550px"}}>
    {Array.isArray(posts) && posts?.map((post, index) => (
      <PostItem key={index} post={post} />
    ))}

    {/* 새글 올리기 버튼*/}
    {
      currentUser && (
      <button className="btn position-absolute"
        style={{ right: "0px", border: "solid 1px rgba(0, 0, 255, 0.3)",
                  backgroundColor: "rgba(50, 50, 50, 0.06)"
        }}
        onClick={() => {
          navigate(`${location.pathname}/post/new${location.search}`);
        }}
      >
        새 글 올리기
      </button>
      )
    }
    </div>
  )
}
