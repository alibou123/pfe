import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Typography,
  message,
  notification,
} from "antd";
import {
  InboxOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import sideCover from "../assets/Online-post-amico.svg";
import Dragger from "antd/es/upload/Dragger";
import axiosInstance from "../utils/axios";

const PostForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  // const [events, setEvents] = useState([]);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   async function fetchEvents() {
  //     const { data } = await axiosInstance.get("/factory/events");

  //     setEvents(data.events);

  //     return data;
  //   }
  //   fetchEvents();
  // }, []);

  const handleUpload = async (info) => {
    let fileList = [...info.fileList];
    // Accept 5 files only
    fileList = fileList.slice(-5);

    fileList.forEach(function (file, index) {
      let reader = new FileReader();
      reader.onload = (e) => {
        file.base64 = e.target.result;
      };
      reader.readAsDataURL(file.originFileObj);
    });

    setFileList(fileList);
  };

  const handleFinish = async (formValues) => {
    formValues.pictures = fileList;
    try {
      const { data } = await axiosInstance.post("/post/", formValues);
      message.success("Ajouter avec succée");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <Typography.Paragraph className="pt-3 px-3">
        Nouvelle Post
      </Typography.Paragraph>
      <div className="row justify-content-between">
        <Form
          onFinish={handleFinish}
          style={{ backgroundColor: "#FAFAFA" }}
          className="p-3 rounded-2 col-lg-6 col-md-12 col-sm-12"
          form={form}
          disabled={loading}
          labelCol={{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
          }}
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 24 },
            lg: { span: 24 },
          }}
          layout="vertical"
          size="middle"
        >
          <Form.Item
            name="post_title"
            label="Titre"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="post_description"
            label="Description"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Dragger
              accept="image/png, image/jpeg"
              multiple={true}
              onChange={handleUpload}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Cliquez ou faites glisser le fichier dans cette zone
              </p>
            </Dragger>
          </Form.Item>
          {/* <Form.Item name="_id_event" label="Relatif à (Optionnel)">
            <Select>
              {events?.map((elem) => (
                <Select.Option value={elem._id}>{elem.name}</Select.Option>
              ))}
            </Select>
          </Form.Item> */}
          <Form.Item>
            <Button>Annuler</Button>
            <Button type="primary" htmlType="submit" className="mx-2">
              Ajouter
            </Button>
          </Form.Item>
        </Form>
        <div className="col-lg-5 d-none d-lg-block">
          <img src={sideCover} alt="sideCover" style={{ width: "90%" }} />
        </div>
      </div>
    </div>
  );
};

export default PostForm;
