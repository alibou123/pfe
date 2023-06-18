import { Button, Checkbox, DatePicker, Form, Modal, message } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axiosInstance from "../utils/axios";
const PresenceModal = ({ json }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const handleFinish = async (formValues) => {
    formValues.date = dayjs(formValues.data).format("DD/MM/YYYY");
    formValues.users = users.map((elem) => {
      let temp;
      if (formValues.presence.find((user) => user === elem)) {
        temp = {
          name: elem,
          value: true,
        };
      } else {
        temp = {
          name: elem,
          value: false,
        };
      }
      return temp;
    });
    formValues.presence = {
      date: formValues.date,
      users: formValues.users,
    };

    try {
      const { data } = await axiosInstance.patch(
        "/event/presence/" + json?._id,
        { presence: formValues.presence }
      );
      message.success("Présence enregistrée avec succès");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  useEffect(() => {
    setUsers([...json?.deliberates, ...json?.members]);
  }, [json]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal} className="mx-2">
        Valider présence
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form className="w-100" form={form} onFinish={handleFinish}>
          <Form.Item className="w-100" name="date">
            <DatePicker className="w-100" />
          </Form.Item>
          <Form.Item className="w-100" name="presence">
            <Checkbox.Group>
              {users.map((elem) => (
                <Checkbox value={elem}>{elem}</Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <Button htmlType="submit">Soumettre!</Button>
        </Form>
      </Modal>
    </>
  );
};
export default PresenceModal;
