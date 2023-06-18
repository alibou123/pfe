import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import sideCover from "../assets/Online-calendar-amico.svg";
import PopOverSelect from "../components/PopOverSelect";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const EventForm = () => {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [delibrates, setDelibrates] = useState([]);
  const [selectedMembers, setSelectMembers] = useState([]);
  const [selectedDelibrates, setSelectDelibrates] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axiosInstance.post("/factory/users/skills", {
        skills: selectedSkills,
      });

      
      const tempMembers = data.users.filter((elem) => elem.role === "Member");
      console.log(data.users)
      const tempDelibrates = data.users.filter(
        (elem) => elem.role === "Volontaire"
      );

      setDelibrates(tempDelibrates);
      setMembers(tempMembers);

      return data;
    }

    fetchUsers();
  }, [selectedSkills]);

  const onChangeOptions = (checkedValues) => {
    setSelectedSkills(checkedValues);
  };

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await axiosInstance.get("/factory/skills");
      setSkills(data.skillCategories);
      return data;
    }

    fetchSkills();
  }, []);

  const handleFinish = async (formValues) => {
    formValues.deliberates = selectedDelibrates;
    formValues.members = selectedMembers;
    formValues.start_date = dayjs(formValues.date[0]);
    formValues.end_date = dayjs(formValues.date[1]);
    formValues.skills = selectedSkills;

    try {
      const { data } = await axiosInstance.post("/event/create", formValues);

      if (data.status === "success") {
        api.success({
          message: "Événement créé",
          description: `L'événement ${formValues.name} est prévu du ${dayjs(
            formValues.date[0]
          ).format("DD/MM/YYYY")} au ${dayjs(formValues.date[1]).format(
            "DD/MM/YYYY"
          )}`,
          duration: 2,
        });
      }
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error?.response?.data?.message,
        duration: 2,
      });
    }
  };

  return (
    <div>
      <Typography.Paragraph className="pt-3 px-3">
        Nouvelle Événement
      </Typography.Paragraph>
      {contextHolder}
      <div className="row justify-content-between">
        <Form
          style={{ backgroundColor: "#FAFAFA" }}
          className="p-3 rounded-2 col-lg-6 col-md-12 col-sm-12"
          form={form}
          disabled={loading}
          onFinish={handleFinish}
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
            name="name"
            label="Nom"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <Input placeholder="Nom" />
          </Form.Item>
          <Form.Item label="Compétence(s) nécessaire(s)">
            <Checkbox.Group
              onChange={onChangeOptions}
              defaultValue={selectedSkills}
              className="row"
            >
              {skills.map((elem) => {
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <Checkbox value={elem.name}>{elem.name}</Checkbox>
                  </div>
                );
              })}
            </Checkbox.Group>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <div className="row">
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="members"
              label="Membres"
            >
              <PopOverSelect
                content={members}
                options={selectedMembers}
                setOptions={setSelectMembers}
                title="Selectionez le(s) membre(s)"
              />
            </Form.Item>
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="deliberates"
              label="Volontaire"
            >
              <PopOverSelect
                content={delibrates}
                options={selectedDelibrates}
                setOptions={setSelectDelibrates}
                title="Selectionez le(s) volontaire(s)"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="date"
            label="Période"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <RangePicker className="w-100" />
          </Form.Item>

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

export default EventForm;
