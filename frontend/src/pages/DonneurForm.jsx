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

import sideCover from "../assets/Online-giver-amico.svg";
import axiosInstance from "../utils/axios";

const DonneurForm = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [stockTypes, setStockTypes] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const handleFinish = async (formValues) => {
    axiosInstance
      .post("/auth/register/giver", formValues)
      .then((res) => {
        if (res.data.status === "success") {
          api.success({
            message: "Donneur enregistrer",
            description: "Le donneur a été enregistré avec succès",
            duration: 2,
          });

          formValues.donation = {
            type_donation: formValues.type_donation,
            product_name: formValues.product_name,
            quantity: formValues.quantity,
            date_given: formValues.date_given,
            _id_giver: res.data.user._id,
          };
          axiosInstance
            .post("/donation/", formValues.donation)
            .then((res) => {
              api.success({
                message: "Don enregistrer",
                description: "Le don a été enregistré avec succès",
                duration: 2,
              });
            })
            .catch((error) => {
              api.error({
                message: "Erreur",
                description: error.response.data.message,
                duration: 2,
              });
            });
        }
      })
      .catch((error) => {
        api.error({
          message: "Erreur",
          description: error.response.data.message,
          duration: 2,
        });
      });
  };

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/stock/types");

      setStockTypes(data.stockTypes);
      return data;
    }

    fetchData();
  }, []);
  return (
    <div>
      {contextHolder}
      <Typography.Paragraph className="pt-3 px-3">
        Nouvelle Donneur
      </Typography.Paragraph>
      <div className="row justify-content-between">
        <Form
          style={{ backgroundColor: "#FAFAFA" }}
          className="p-3 rounded-2 col-lg-6 col-md-12 col-sm-12"
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
          onFinish={handleFinish}
          size="middle"
        >
          <div className="row">
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="last_name"
              label="Prénom"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <Input placeholder="Prénom" />
            </Form.Item>
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="first_name"
              label="Nom"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <Input placeholder="Nom" />
            </Form.Item>
          </div>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <Input type="email" />
          </Form.Item>
          <div className="row">
            <Form.Item
              className="col-lg-6 col-md-6 col-sm-12"
              name="phone_number"
              label="Numéro télèphone"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <InputNumber className="w-100" />
            </Form.Item>

            <Form.Item
              name="birthDate"
              className="col-lg-6 col-md-6 col-sm-12"
              label="Date de naissance"
              rules={[{ required: true, message: "Merci de remplir le champ" }]}
            >
              <DatePicker className="w-100" />
            </Form.Item>
          </div>
          <div className="bg-dark bg-opacity-25 rounded-3 shadow-sm px-4 mb-3 py-2">
            <label className="mb-2">Nouvelle Don</label>
            <div className="row">
              <Form.Item
                className="col-lg-6 col-md-6 col-sm-12"
                name="type_donation"
                label="Type"
                rules={[
                  { required: true, message: "Merci de remplir le champ" },
                ]}
              >
                <Select placeholder="Selectionez un type du dons">
                  {stockTypes.map((elem) => {
                    return (
                      <Select.Option value={elem.name}>
                        {elem.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                className="col-lg-6 col-md-6 col-sm-12"
                name="date_given"
                label="Date"
                rules={[
                  { required: true, message: "Merci de remplir le champ" },
                ]}
              >
                <DatePicker className="w-100" />
              </Form.Item>
            </div>
            <div className="row">
              <Form.Item
                name="product_name"
                className="col-lg-6 col-md-6 col-sm-12"
                label="Nom produit donnée"
                rules={[
                  { required: true, message: "Merci de remplir le champ" },
                ]}
              >
                <Input className="w-100" />
              </Form.Item>
              <Form.Item
                className="col-lg-6 col-md-6 col-sm-12"
                name="quantity"
                label="Quantité"
                rules={[
                  { required: true, message: "Merci de remplir le champ" },
                ]}
              >
                <InputNumber className="w-100" />
              </Form.Item>
            </div>
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

export default DonneurForm;
