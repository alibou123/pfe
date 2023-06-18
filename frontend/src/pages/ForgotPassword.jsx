import { useState } from "react";
import { Form, Input, Button, Typography, Spin, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
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

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const Navigate = useNavigate();

  const handleFinish = async (formValues) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post(
        "/auth/forgot/password",
        formValues
      );
      message.success(
        "Un lien pour réinitialiser votre mot de passe a été envoyé sur votre email !"
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
        <h3 className="pb-3">Mot de passe oublié ?</h3>

        <p className="text-muted">
          Entrez l'email de votre compte et nous vous enverrons un lien pour
          réinitialiser votre mot de passe.
        </p>
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "S’il vous plaît entrer votre email!",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                form.setFieldsValue({
                  email: e.target.value.replace(/ /g, ""),
                });
              }}
            />
          </Form.Item>

          <Form.Item>
            <div className="d-flex justify-content-between mt-2">
              <Button type="primary" htmlType="submit">
                Soumettre
              </Button>
              {loading && (
                <Spin
                  style={{ marginLeft: "10px" }}
                  size="large"
                  indicator={antIcon}
                />
              )}
              <Link
                className="mt-1"
                style={{ textDecoration: "none" }}
                to="/login"
              >
                Connectez vous
              </Link>
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

export default ForgotPassword;
