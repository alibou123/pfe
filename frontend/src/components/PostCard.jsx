import {
  DeleteOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import {
  Carousel,
  Card,
  Skeleton,
  Image,
  Typography,
  message,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import EditPostModal from "./EditPostModal";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#f5f5f5",
};

const { Meta } = Card;
const PostCard = ({ id, access }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState({});
  const handleDelete = async () => {
    try {
      const { data } = await axiosInstance.delete("/post/delete/" + id);
      window.location.reload();
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/post/" + id);

      setPost(data.post);
      setLoading(false);
      return data;
    }

    fetchData();
  }, []);

  const ChangeVisiblityStatus = async (status) => {
    try {
      const { data } = await axiosInstance.patch("/post/visibility/" + id, {
        status: status,
      });
      setPost({ ...post, status: status });
      message.success("Visibilité a été changé avec succés");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  return (
    <>
      <Card
        style={{
          marginTop: 16,
        }}
        actions={
          access
            ? [
                post.status === "Hidden" ? (
                  <Tooltip title="Afficher la post ?">
                    <EyeOutlined
                      onClick={() => ChangeVisiblityStatus("Visible")}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Cacher la post ?">
                    <EyeInvisibleOutlined
                      onClick={() => ChangeVisiblityStatus("Hidden")}
                    />
                  </Tooltip>
                ),
                <DeleteOutlined key="delete" onClick={handleDelete} />,
                <EditPostModal setPost={setPost} post={post} />,
              ]
            : {}
        }
      >
        <Skeleton loading={loading} active>
          <Meta
            title={post.post_title}
            description={
              <>
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                    expandable: true,
                    symbol: "Plus",
                  }}
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {post.post_description}
                </Typography.Paragraph>
                <Carousel autoplay>
                  {post.pictures?.map((elem) => {
                    return (
                      <div className="d-flex justify-content-center">
                        <Image
                          preview
                          style={contentStyle}
                          src={elem.base64}
                          alt={elem.name}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </>
            }
          />
        </Skeleton>
      </Card>
    </>
  );
};
export default PostCard;
