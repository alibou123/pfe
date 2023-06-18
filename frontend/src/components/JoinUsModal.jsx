import {
  DatePicker,
  Input,
  Modal,
  Form,
  Select,
  message,
  notification,
  Button,
} from "antd";
import axiosInstance from "../utils/axios";
import { useEffect, useState } from "react";
const JoinUsModal = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/skills");

      setSkills(data.skillCategories);

      return data;
    }

    fetchData();
  }, []);

  const handleOk = async (formValues) => {
    setDisabled(true);
    try {
      const { data } = await axiosInstance.post("/auth/register", formValues);

      api.success({
        message: "Inscription réussie",
        description:
          "Nous vous contacterons prochainement, au sujet de votre inscription",
      });
      setDisabled(false);
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.response.data.message);
      setDisabled(false);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title="Rejoignez-nous" open={isModalOpen} onCancel={handleCancel}>
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
          disabled={disabled}
          layout="vertical"
          onFinish={handleOk}
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

          {contextHolder}

          <Form.Item
            name="skill_description"
            label="Description"
            rules={[{ required: true, message: "Veuillez remplir le champ" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Soumettre
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default JoinUsModal;
