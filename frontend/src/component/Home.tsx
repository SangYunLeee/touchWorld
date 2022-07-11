import React, { useState, useEffect, } from "react";
import { useParams } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";

import PostDataService from "../service/post.service";
import IPost from "../types/Post";
import PostList from "./PostList";

export default function Home() {
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [curCategory] = useQueryParam("category", StringParam);
  let { authorId } = useParams();
  useEffect(() => {
    retrievePosts();
  }, []);

  useEffect(() => {
    console.log("category: ", curCategory);
    retrievePosts();
  }, [curCategory]);

  const retrievePosts = () => {
    console.log("authorId: ", authorId);
    let queryParams = {};
    if (curCategory) {
      queryParams["category"] = curCategory;
    }
    if (authorId) {
      queryParams["author"] = authorId;
    }
    PostDataService.getAll(queryParams)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return <PostList posts={posts} />;
}
