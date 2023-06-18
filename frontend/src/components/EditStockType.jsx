import { Button, Form, Input, Modal, message } from "antd";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import axiosInstance from "../utils/axios";
const EditStockType = ({ record }) => {
  const { stockType, setStockType } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...record });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const formValues = form.getFieldsValue();
    try {
      const { data } = await axiosInstance.patch(
        "/stock/type/edit/" + record._id,
        { name: formValues.name }
      );
      const temp = stockType.map((elem) => {
        if (elem._id === record._id) {
          elem.name = formValues.name;
        }
        return elem;
      });
      setStockType(temp);
      message.success("Le type du stock a été modifiée avec succès");
      setIsModalOpen(false);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button size="small" onClick={showModal}>
        Modifier
      </Button>
      <Modal
        title="Motifier type du stock"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
          layout="vertical"
          size="middle"
        >
          <Form.Item
            name="name"
            label="Nom"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <Input className="w-100" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditStockType;
