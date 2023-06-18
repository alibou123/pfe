import { Button, Drawer, Form, Input, Typography, message } from "antd";
import { EditOutlined, InboxOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import Dragger from "antd/es/upload/Dragger";
const EditPostModal = ({ setPost, post }) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.setFieldsValue({ ...post });
  }, [post]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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

  const handleEdit = async (formValues) => {
    setLoading(true);
    formValues.pictures = fileList;
    try {
      const { data } = await axiosInstance.patch("/post/edit/" + post._id, {
        ...formValues,
      });
      message.success("Post a été modifier avec succés");
      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, [2000]);
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };
  return (
    <>
      <EditOutlined onClick={showDrawer} />
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <Form
          onFinish={handleEdit}
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
          <div className="mb-3">
            <Typography.Text type="danger">
              Remarque : Si vous modifiez la liste d'images, votre ancienne
              liste sera définitivement supprimée.
            </Typography.Text>
          </div>
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
          <Form.Item>
            <Button>Annuler</Button>
            <Button type="primary" htmlType="submit" className="mx-2">
              Modifier
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default EditPostModal;
