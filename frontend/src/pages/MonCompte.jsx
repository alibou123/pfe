import { Button, DatePicker, Form, Input, Select, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const MonCompte = () => {
  const [user, setUser] = useState();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchMe() {
      const { data } = await axiosInstance.get("/auth/me");
      setUser(data.user);
      let temp = data.user;
      temp.birthDate = dayjs(data.user.birthDate);
      form.setFieldsValue({ ...temp });
      return data;
    }

    fetchMe();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/skills");

      setSkills(data.skillCategories);

      return data;
    }

    fetchData();
  }, []);

  const Navigate = useNavigate();

  const handleUpdate = async (formValues) => {
    try {
      const { data } = await axiosInstance.patch("/auth/edit", {
        ...formValues,
      });
      message.success("Compte a été modifiée avec success");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleEditPassword = async (formValues) => {
    try {
      const { data } = await axiosInstance.patch("/auth//change/password", {
        ...formValues,
      });
      message.success("Mot de pass a été modifiée avec success.");

      setTimeout(() => {
        localStorage.clear();
        Navigate("/login");
      }, [2000]);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  return (
    <div>
      <div>Mon Compte</div>
      <div className="container bg-light p-5 mt-3 mb-3 rounded-4 shadow-sm">
        <div>Modifier donnée personnel</div>
        <Form
          form={form}
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
          // disabled={disabled}
          layout="vertical"
          onFinish={handleUpdate}
          size="middle"
        >
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Form.Item
                name="first_name"
                label="Prénom"
                rules={[
                  { required: true, message: "Veuillez remplir le champ" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Form.Item
                name="last_name"
                label="Nom"
                rules={[
                  { required: true, message: "Veuillez remplir le champ" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Veuillez remplir le champ" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <Form.Item
                name="phone_number"
                label="Téléphone"
                rules={[
                  { required: true, message: "Veuillez remplir le champ" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <Form.Item
              className="col-lg-6 col-md-12 col-sm-12"
              name="birthDate"
              label="Date de naissance"
              rules={[{ required: true, message: "Veuillez remplir le champ" }]}
            >
              <DatePicker className="w-100" />
            </Form.Item>
            <Form.Item
              className="col-lg-6 col-md-12 col-sm-12"
              name="adress"
              label="Adresse"
              rules={[{ required: true, message: "Veuillez remplir le champ" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item
              name="skill"
              label="Compétence"
              className="col-lg-6 col-md-6 col-sm-12"
              rules={[{ required: true, message: "Veuillez remplir le champ" }]}
            >
              <Select>
                {skills.map((elem) => (
                  <Select.Option value={elem.name}>{elem.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="occupation"
              label="Occupation"
              className="col-lg-6 col-md-6 col-sm-12"
              rules={[{ required: true, message: "Veuillez remplir le champ" }]}
            >
              <Select>
                <Select.Option value="Élève">Élève</Select.Option>
                <Select.Option value="Etudiant">Etudiant</Select.Option>
                <Select.Option value="Employee">Employee</Select.Option>
                <Select.Option value="Non employee">Non employee</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="skill_description"
            label="Description"
            rules={[{ required: true, message: "Veuillez remplir le champ" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Modifier
            </Button>
          </div>
        </Form>
      </div>
      <div className="container bg-light p-5 mt-3 mb-3 rounded-4 shadow-sm">
        <Form
          form={passwordForm}
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
          // disabled={disabled}
          layout="vertical"
          onFinish={handleEditPassword}
        >
          <Form.Item
            name="password"
            label="Nouvelle mot de pass"
            rules={[{ required: true, message: "Veuillez remplir le champ" }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            name="passwordConfirm"
            label="Confirmer la nouvelle mot de pass"
            rules={[{ required: true, message: "Veuillez remplir le champ" }]}
          >
            <Input type="password" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Modifier
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MonCompte;
