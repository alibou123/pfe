import { Button, Space, Table, Tag, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import axiosInstance from "../utils/axios";
const HoraireList = () => {
  const { role } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [horaire, setHoraire] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (role === "Admin") {
        const { data } = await axiosInstance.get("/factory/horaire");
        setHoraire(data.horaires);
        setLoading(false);
        return data;
      } else {
        const { data } = await axiosInstance.get("/factory/horaire/me");
        setHoraire(data.horaires);
        setLoading(false);
        return data;
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstance.delete("/horaire/delete/" + id);
      const temp = horaire.filter((elem) => elem._id !== id);

      setHoraire(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    role === "Admin"
      ? {
          title: "Nom complet",
          children: [
            {
              title: "Prénom",
              dataIndex: "_user_first_name",
              key: "_user_first_name",
            },
            {
              title: "Nom",
              dataIndex: "_user_last_name",
              key: "_user_last_name",
            },
          ],
        }
      : {},
    {
      title: "Jour(s) disponible",
      dataIndex: "days",
      render: (_, record) => (
        <Space>
          {record?.days?.map((elem) => (
            <Tag color="red">{elem}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Durée",
      render: (_, record) => (
        <Typography.Text>
          {record.start_hour} - {record.end_hour}
        </Typography.Text>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => handleDelete(record._id)}
          >
            Supprimer
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={horaire}
        loading={loading}
        columns={columns}
        title={() => "Liste des horaires"}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 5,
        }}
      />
    </>
  );
};
export default HoraireList;
