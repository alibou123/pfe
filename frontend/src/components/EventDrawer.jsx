import {
  Button,
  Drawer,
  Form,
  Input,
  DatePicker,
  notification,
  Tag,
  Checkbox,
  message,
  Popconfirm,
} from "antd";
import { useContext, useEffect, useState } from "react";
import PopOverSelect from "./PopOverSelect";
import axiosInstance from "../utils/axios";
import dayjs from "dayjs";
import GlobalContext from "../contexts/GlobalContext";
import PresenceModal from "./PresenceModal";

const { RangePicker } = DatePicker;

const EventDrawer = ({ json, events, setEvents }) => {
  const { role, fullName } = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [delibrates, setDelibrates] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [selectedMembers, setSelectMembers] = useState([]);
  const [selectedDelibrates, setSelectDelibrates] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axiosInstance.post("/factory/users/skills", {
        skills: selectedSkills,
      });

      const tempMembers = data.users.filter((elem) => elem.role === "Member");
      const tempDelibrates = data.users.filter(
        (elem) => elem.role === "Volontaire"
      );

      setDelibrates(tempDelibrates);
      setMembers(tempMembers);

      return data;
    }

    fetchUsers();
  }, [selectedSkills]);

  useEffect(() => {
    async function fetchSkills() {
      const { data } = await axiosInstance.get("/factory/skills");
      setSkills(data.skillCategories);
      return data;
    }

    fetchSkills();
    setSelectMembers(json.members);
    setSelectedSkills(json.skills);
    setSelectDelibrates(json.deliberates);

    form.setFieldsValue({
      name: json.name,
      description: json.description,
      date: [dayjs(json.start_date), dayjs(json.end_date)],
    });
  }, [json]);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const onChangeOptions = (checkedValues) => {
    setSelectedSkills(checkedValues);
  };

  const handleFinish = async (formValues) => {
    formValues.deliberates = selectedDelibrates;
    formValues.members = selectedMembers;
    formValues.start_date = dayjs(formValues.date[0]);
    formValues.end_date = dayjs(formValues.date[1]);
    formValues.skills = selectedSkills;

    try {
      const { data } = await axiosInstance.patch(
        "/event/edit/" + json._id,
        formValues
      );

      if (data.status === "success") {
        api.success({
          message: "Événement modifiée",
          description: `L'événement ${formValues.name} est été modifié`,
          duration: 2,
        });

        const temp = events.map((elem) => {
          if (elem._id === json._id) {
            elem = { ...elem, ...formValues };
          }

          return elem;
        });

        setEvents(temp);
        onChildrenDrawerClose();
        onClose();
      }
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error?.response?.data?.message,
        duration: 2,
      });
    }
  };

  const handleUnavailable = async () => {
    try {
      const { data } = await axiosInstance.patch(
        "/event/delibrate/presence/" + json._id,
        {
          fullName: fullName,
        }
      );
      message.success(
        "Vous avez été supprimé de la liste des participants à cet événement."
      );

      setTimeout(() => {
        window.location.reload();
      }, [3000]);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      <a onClick={showDrawer}>Consulter</a>
      <Drawer
        title={json.name}
        width={620}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <div>
          <p>Nom de l'évenement: {json.name}</p>
          <p style={{ whiteSpace: "pre-wrap" }}>
            Description: {json.description}
          </p>
          <p>
            Membres:{" "}
            {json?.members?.length > 0
              ? json?.members.map((elem) => {
                  return <Tag color="red">{elem}</Tag>;
                })
              : "Aucune donnée"}
          </p>
          <p>
            Membres:{" "}
            {json?.deliberates?.length > 0
              ? json?.deliberates.map((elem) => {
                  return <Tag color="magenta">{elem}</Tag>;
                })
              : "Aucune donnée"}
          </p>
          <p>
            Période: {dayjs(json?.start_date).format("DD/MM/YYYY")} au{" "}
            {dayjs(json?.end_date).format("DD/MM/YYYY")}{" "}
          </p>
        </div>
        {role === "Admin" && (
          <Button type="primary" onClick={showChildrenDrawer}>
            Modifier l'événement
          </Button>
        )}
        {role === "Admin" && <PresenceModal json={json} />}
        {role !== "Admin" && (
          <Button
            type="primary"
            disabled={
              json?.deliberates?.find((elem) => elem === fullName) ||
              json?.members?.find((elem) => elem === fullName)
            }
          >
            Confirmer ma présence
          </Button>
        )}
        {role !== "Admin" && (
          <Popconfirm
            title="Vous serez définitivement supprimé de la liste des participants ?"
            onConfirm={handleUnavailable}
          >
            <Button
              type="primary"
              className="mx-2"
              disabled={
                !json?.deliberates?.find((elem) => elem === fullName) &&
                !json?.members?.find((elem) => elem === fullName)
              }
            >
              Incapable de joindre
            </Button>
          </Popconfirm>
        )}

        <p className="mt-2">
          Presences: ( <Tag color="green">Les verts sont présents</Tag>,{" "}
          <Tag color="red">les rouges ne le sont pas</Tag>)
        </p>
        {role === "Admin" &&
          json?.presence?.map((elem) => {
            return (
              <p>
                {/* TO FIX in case a delibrate consults it. */}
                <span className="fw-bold">{elem.date} : </span>
                {elem.users.map((user) => (
                  <Tag color={user.value === true ? "green" : "red"}>
                    {user.name}
                  </Tag>
                ))}
              </p>
            );
          })}
        {role !== "Admin" &&
          json?.presence?.map((elem) => {
            return (
              <p>
                {/* TO FIX in case a delibrate consults it. */}
                <span className="fw-bold">{elem.date} : </span>
                {elem.users.map((user) => {
                  return (
                    user.name === fullName && (
                      <Tag color={user.value === true ? "green" : "red"}>
                        {user.name}
                      </Tag>
                    )
                  );
                })}
              </p>
            );
          })}
        <Drawer
          title="Modifier l'évenement"
          width={420}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          <Form
            form={form}
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

            <Form.Item name="members" label="Membres">
              <PopOverSelect
                content={members}
                options={selectedMembers}
                setOptions={setSelectMembers}
                title="Selectionez le(s) membre(s)"
              />
            </Form.Item>
            <Form.Item name="deliberates" label="Volontaire">
              <PopOverSelect
                content={delibrates}
                options={selectedDelibrates}
                setOptions={setSelectDelibrates}
                title="Selectionez le(s) volontaire(s)"
              />
            </Form.Item>

            <Form.Item
              name="date"
              label="Période"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <RangePicker className="w-100" />
            </Form.Item>

            <Form.Item>
              <Button onClick={onChildrenDrawerClose}>Annuler</Button>
              <Button type="primary" htmlType="submit" className="mx-2">
                Modifier
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </Drawer>
    </>
  );
};
export default EventDrawer;
