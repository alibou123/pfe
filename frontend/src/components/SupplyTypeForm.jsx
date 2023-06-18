import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  message,
} from "antd";
import React, { useContext, useState } from "react";

import GlobalContext from "../contexts/GlobalContext";
import axiosInstance from "../utils/axios";

const SupplyTypeForm = () => {
  const { stockType, setStockType } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (formValues) => {
    try {
      const { data } = await axiosInstance.post("/stock/type", formValues);
      setStockType([...stockType, data.stockType]);
      message.success("Nouvelle type de stock a été enregistrée");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Typography.Paragraph className="pt-3 px-3">
        Nouvelle type
      </Typography.Paragraph>

      <Form
        style={{ backgroundColor: "#FAFAFA" }}
        className="p-3 rounded-2"
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
          label="Nom du type"
          rules={[{ required: true, message: "Merci de remplir le champ" }]}
        >
          <Input className="w-100" />
        </Form.Item>

        <Form.Item>
          <Button>Annuler</Button>
          <Button type="primary" htmlType="submit" className="mx-2">
            Ajouter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SupplyTypeForm;
