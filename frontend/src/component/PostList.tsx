import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import PostItem from "./PostItem";
import useNavigateDefault from "../helper/useNavigateDefault";


export default function PostList(props: { posts }) {
  const { posts } = props;
  let navigateDefault = useNavigateDefault();
  const currentUser = useContext(UserContext);

  const NewButton = () => {
    return (
      <button
        className="btn btn-sm align-self-center me-3 mb-3"
        style={{
          right: "0px",
          border: "solid 1px rgba(0, 0, 255, 0.3)",
          backgroundColor: "rgba(50, 50, 50, 0.06)",
          width: "150px",
        }}
        onClick={() => {
          navigateDefault(`/post/new`)();
        }}
      >
        새 글 올리기 +
      </button>
    );
  };

  return (
    // 포스트 리스트
    <div className="d-flex flex-column-reverse DefaultMainContext">
      {/* 새글 올리기 버튼*/}
      {currentUser && <NewButton />}
      {/* 글 리스트 */}
      {Array.isArray(posts) &&
        posts?.map((post, index) => <PostItem key={index} post={post} />)}

      {currentUser && posts?.length > 14 && <NewButton />}
    </div>
  );
}
