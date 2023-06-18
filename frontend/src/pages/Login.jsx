import { useContext, useState } from "react";
import { Form, Input, Button, Spin, notification } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import LocalStorageService from "../utils/localStorageService";
import axiosInstance from "../utils/axios";
import logo from "../assets/logo.png";
import GlobalContext from "../contexts/GlobalContext";
import jwt_decode from "jwt-decode";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Login = () => {
  const { setRole, setFullName } = useContext(GlobalContext);
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const Navigate = useNavigate();

  const handleFinish = async (formValues) => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", formValues);
      api.success({
        message: "Connexion réussie",
        description: `Bienvenue ${data.fullName}`,
        duration: 2,
      });
      LocalStorageService().setAccessToken(data.token);
      const role = jwt_decode(data.token).role;
      setRole(role);
      setFullName(jwt_decode(data.token).fullName);
      setTimeout(() => {
        setLoading(false);
        if (role === "Volontaire") {
          Navigate("/dashboard/event/list");
        } else if (role === "Donneur") {
          Navigate("/dashboard/donation/list");
        } else {
          Navigate("/dashboard/event/list");
        }
      }, [2000]);
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error?.response?.data?.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center bg-light">
      {contextHolder}
      <div className="bg-white py-4 px-5 rounded-4 shadow-lg col-lg-5 col-md-7 col-sm-12">
        <h3 className="pb-3">Connectez-vous à votre compte</h3>
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
          <Form.Item
            label="Mot de passe"
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

          <Form.Item>
            <div className="d-flex justify-content-between mt-2">
              <Button type="primary" htmlType="submit">
                Se connecter
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
                to="/forgot/password"
                // onClick={() => {
                //   Navigate("/forgot-password");
                // }}
              >
                Mot de passe oublié ?
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

export default Login;
