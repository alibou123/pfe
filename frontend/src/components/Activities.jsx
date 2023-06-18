import { Carousel, Empty, Image } from "antd";
import React, { useEffect, useState } from "react";
import cat from "../assets/cat.jpg";
import axiosInstance from "../utils/axios";
import PostCard from "./PostCard";

const Activities = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/posts/visible");

      setPosts(data.posts);

      return data;
    }

    fetchData();
  }, []);
  return (
    <div className="vh-100 bg-white d-flex flex-column justify-content-evenly vw-100 justify-content-center align-items-center" id="actuality">
      <div className="w-50">
        <h2 className="fw-bold">Actualité</h2>
      </div>
      <div className="container mx-5 bg-light rounded-5 shadow-sm">
        <Carousel className="p-5">
          {posts.map((elem) => {
            return (
              <div>
                <PostCard id={elem._id} access={false} />
              </div>
            );
          })}
          {posts.length === 0 && (
            <Empty description="Aucune post pour le moment" />
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default Activities;
