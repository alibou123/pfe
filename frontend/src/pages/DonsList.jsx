import {
  Button,
  Popconfirm,
  Space,
  Table,
  Tag,
  Typography,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import GlobalContext from "../contexts/GlobalContext";
import DonationDrawer from "../components/DonationDrawer";

const DonsList = () => {
  const { role } = useContext(GlobalContext);
  const [api, contextHolder] = notification.useNotification();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (role === "Admin") {
        const { data } = await axiosInstance.get("/factory/donations");

        setDonations(data.donations);

        return data;
      } else if (role === "Donneur") {
        const { data } = await axiosInstance.get("/factory/donations/givers");

        setDonations(data.donations);

        return data;
      } else {
        const { data } = await axiosInstance.get(
          "/factory/donations/deliberates"
        );

        setDonations(data.donations);

        return data;
      }
    }

    fetchData();
  }, [role]);

  const handleValidate = async (_id) => {
    try {
      const { data } = await axiosInstance.patch("/donation/validate/" + _id);
      api.success({
        message: "Validations réussie",
        description: "Le don a été validé avec succès",
      });

      const temp = donations.map((elem) => {
        if (elem._id === _id) {
          elem.status = "Accepted";
        }
        return elem;
      });

      setDonations(temp);
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error.response.data.message,
      });
    }
  };

  const handleDelete = async (_id) => {
    try {
      const { data } = await axiosInstance.delete("/donation/delete/" + _id);
      api.success({
        message: "Suppression réussie",
        description: "Le don a été supprimée avec succès",
      });

      const temp = donations.filter((elem) => elem._id !== _id);

      setDonations(temp);
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error.response.data.message,
      });
    }
  };

  const columns = [
    role !== "Donneur"
      ? {
          title: "Nom complet",
          children: [
            {
              title: "Prénom",
              dataIndex: "giver_first_name",
              key: "giver_first_name",
            },
            {
              title: "Nom",
              dataIndex: "giver_last_name",
              key: "giver_last_name",
            },
          ],
        }
      : {},
    {
      title: "Nom du produit",
      dataIndex: "product_name",
    },
    {
      title: "Type du produit",
      dataIndex: "type_donation",
    },
    {
      title: "Quantité",
      dataIndex: "quantity",
    },
    {
      title: "Date",
      dataIndex: "date_given",
      render: (text) => (
        <Typography.Text className="fw-bold">
          {dayjs(text).format("DD/MM/YYYY")}
        </Typography.Text>
      ),
    },
    {
      title: "Statut",
      dataIndex: "status",
      render: (text) => (
        <Tag
          color={
            text === "Pending"
              ? "orange"
              : text === "Accepted"
              ? "green"
              : "blue"
          }
        >
          {text === "Pending"
            ? "Non encore validé"
            : text === "Accepted"
            ? "Disponible"
            : "Affecté"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          {role === "Admin" && (
            <Popconfirm
              disabled={
                record.status === "Accepted" || record.status === "Affected"
              }
              title="Valider le don"
              description="êtes-vous sûr de valider le don ?"
              okText="Oui"
              onConfirm={() => {
                handleValidate(record._id);
              }}
            >
              <Button
                size="small"
                type="primary"
                disabled={
                  record.status === "Accepted" || record.status === "Affected"
                }
              >
                Valider
              </Button>
            </Popconfirm>
          )}
          {role === "Admin" && (
            <Popconfirm
              disabled={record.status === "Affected"}
              title="Valider le don"
              description="êtes-vous sûr de supprimé le don ?"
              okText="Oui"
              onConfirm={() => {
                handleDelete(record._id);
              }}
            >
              <Button
                size="small"
                type="primary"
                disabled={record.status === "Affected"}
              >
                Supprimer
              </Button>
            </Popconfirm>
          )}
          <DonationDrawer
            json={record}
            donations={donations}
            setDonations={setDonations}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table
        dataSource={donations}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 5,
        }}
        title={() => "Liste des dons"}
      />
    </>
  );
};
export default DonsList;
