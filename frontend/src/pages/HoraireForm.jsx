import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  Typography,
  message,
  notification,
} from "antd";
import React, { useState } from "react";

// To Verify times +06 Mins
import sideCover from "../assets/Online-hourly-amico.svg";
import axiosInstance from "../utils/axios";
import dayjs from "dayjs";

const HoraireForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleFinish = async (formValues) => {
    formValues.start_hour = dayjs(formValues.horaire[0]).format("HH:MM");
    formValues.end_hour = dayjs(formValues.horaire[1]).format("HH:MM");
    if (selectedDays.length === 0) {
      return api.error({
        message: "Erreur",
        description: "Veuillez sélectionner au moins un jour disponible",
        duration: 2,
      });
    }
    formValues.dayjs = selectedDays;
    try {
      const { data } = await axiosInstance.post("/horaire", formValues);
      if (data.status === "success") {
        message.success("Horaire a été mis à jour avec succès");
      }
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error.response.data.message,
        duration: 2,
      });
    }
  };

  const onChangeOptions = (checkedValues) => {
    setSelectedDays(checkedValues);
  };
  return (
    <div>
      <Typography.Paragraph className="pt-3 px-3">
        Nouvelle horaire
      </Typography.Paragraph>
      {contextHolder}
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
          <Form.Item name="days" label="Jour(s)">
            <Checkbox.Group className="row" onChange={onChangeOptions}>
              <div className="co-lg-3 col-md-4 col-sm-12">
                <Checkbox value="Lundi">Lundi</Checkbox>
              </div>
              <div className="co-lg-3 col-md-4 col-sm-12">
                <Checkbox value="Mardi">Mardi</Checkbox>
              </div>
              <div className="co-lg-3 col-md-4 col-sm-12">
                <Checkbox value="Mercredi">Mercredi</Checkbox>
              </div>
              <div className="co-lg-3 col-md-4 col-sm-12">
                <Checkbox value="Jeudi">Jeudi</Checkbox>
              </div>
              <div className="co-lg-3 col-md-4 col-sm-12">
                <Checkbox value="Vendredi">Vendredi</Checkbox>
              </div>
              <div className="co-lg-3 col-md-4 col-sm-12">
                <Checkbox value="Samedi">Samedi</Checkbox>
              </div>
              <div className="co-lg-3 col-md-4 col-sm-12">
                <Checkbox value="Dimanche">Dimanche</Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item
            name="horaire"
            label="Horaire"
            rules={[{ required: true, message: "Merci de remplir le champ" }]}
          >
            <TimePicker.RangePicker format={"HH:mm"} className="w-100" />
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

export default HoraireForm;
