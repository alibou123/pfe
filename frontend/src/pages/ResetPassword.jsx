import { useState } from "react";
import { Form, Input, Button, Typography, Spin, message } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import jwt from "jwt-decode";
import axiosInstance from "../utils/axios";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const { Text } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const Navigate = useNavigate();

  const { token } = useParams();

  const handleFinish = async (formValues) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.patch(
        "auth/rest/password/" + token,
        formValues
      );

      message.success(
        "Le mot de passe a été réinitialisé, vous serez redirigé vers la page de connexion"
      );
      setTimeout(() => {
        Navigate("/login");
      }, [2000]);
    } catch (error) {
      message.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
      <div className="bg-white py-4 px-5 rounded-4 shadow-lg col-lg-5 col-md-7 col-sm-12">
        <h3 className="pb-3">Réinitialisez votre mot de passe</h3>
        <Form
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
          onFinish={handleFinish}
        >
          <Form.Item
            label="Nouvelle mot de passe"
            name="password"
            rules={[
              {
                required: true,
                message: "S’il vous plaît entrer votre mot de passe!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                form.setFieldsValue({
                  password: e.target.value.replace(/ /g, ""),
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label="Confirmer le mot de passe"
            name="passwordConfirm"
            rules={[
              {
                required: true,
                message: "S’il vous plaît confirmer votre mot de passe!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                form.setFieldsValue({
                  passwordConfirm: e.target.value.replace(/ /g, ""),
                });
              }}
            />
          </Form.Item>

          <Form.Item>
            <div className="d-flex justify-content-between mt-2">
              <Button type="primary" htmlType="submit">
                Réinitialiser
              </Button>
              {loading && (
                <Spin
                  style={{ marginLeft: "10px" }}
                  size="large"
                  indicator={antIcon}
                />
              )}
            </div>
          </Form.Item>
        </Form>
        <div className="d-flex justify-content-between align-items-center border-top">
          <img
            src={logo}
            style={{
              width: "45px",
              height: "45px",
              marginRight: "15px",
              marginTop: "10px",
            }}
          />
          <p className="text-muted mt-4">
            ©2023 croissant rouge tunisien. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
