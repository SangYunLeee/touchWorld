import React, { useState, useEffect } from "react";
import PostDataService from "../service/post.service";
import PostItem from "./PostItem";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    retrievePosts();
  }, []);

  const retrievePosts = () => {
    PostDataService.getAll()
      .then(response => {
        setPosts(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <>
    {posts.map((post, index) => (
      <PostItem key={index} title={post.title} description={post.description} />
    ))}
    </>
  )
}
