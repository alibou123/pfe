import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";

import sideCover from "../assets/Online-donation-amico.svg";
import axiosInstance from "../utils/axios";

const DonsForm = () => {
  const [loading, setLoading] = useState(false);
  const [givers, setGivers] = useState([]);
  const [stockTypes, setStockTypes] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/stock/types");

      setStockTypes(data.stockTypes);
      return data;
    }

    async function fetchGivers() {
      const { data } = await axiosInstance.get("/factory/users/givers");

      setGivers(data.givers);
      return data;
    }

    fetchGivers();
    fetchData();
  }, []);

  const handleFinish = async (formValues) => {
    try {
      const { data } = await axiosInstance.post("/donation/", formValues);
      api.success({
        message: "Don enregistrer",
        description: "Le don a été enregistré avec succès",
        duration: 2,
      });
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error.response.data.message,
        duration: 2,
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <Typography.Paragraph className="pt-3 px-3">
        Nouvelle Don
      </Typography.Paragraph>
      <div className="row justify-content-between">
        <Form
          style={{ backgroundColor: "#FAFAFA" }}
          className="p-3 rounded-2 col-lg-6 col-md-12 col-sm-12"
          form={form}
          onFinish={handleFinish}
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
        >
          <Form.Item
            name="_id_giver"
            label="Donneur"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <Select>
              {givers?.map((elem) => (
                <Select.Option value={elem._id}>
                  {elem.first_name + " " + elem.last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className="row">
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="type_donation"
              label="Type"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <Select placeholder="Selectionez un type du dons">
                {stockTypes.map((elem) => {
                  return (
                    <Select.Option value={elem.name}>{elem.name}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="date_given"
              label="Date"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <DatePicker className="w-100" />
            </Form.Item>
          </div>

          <div className="row">
            <Form.Item
              name="product_name"
              className="col-lg-6 col-md-6 col-sm-12"
              label="Nom produit donnée"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <Input className="w-100" />
            </Form.Item>
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="quantity"
              label="Quantité"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <InputNumber className="w-100" />
            </Form.Item>
          </div>

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

export default DonsForm;
