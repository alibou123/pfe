import React, { useState } from "react";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Empty } from "antd";

const PostList = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/posts/");

      setPosts(data.posts);

      return data;
    }

    fetchData();
  }, []);

  return (
    <div>
      <h6>Liste des posts</h6>
      <div className="row justify-content-center">
        {posts.map((elem) => {
          return (
            <div className="col-lg-10 col-md-12 col-sm-12 ">
              <PostCard id={elem._id} access={true} />
            </div>
          );
        })}
        {posts.length === 0 && <Empty description="Aucun post." />}
      </div>
    </div>
  );
};

export default PostList;
