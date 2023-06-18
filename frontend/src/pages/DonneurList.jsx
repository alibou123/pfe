import { Button, Space, Table, Tag, Tooltip, notification } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import dayjs from "dayjs";
import GiverDrawer from "../components/GiverDrawer";

const DonneurList = () => {
  const [givers, setGivers] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/users/givers");

      setGivers(data.givers);

      return data;
    }

    fetchData();
  }, []);

  const handleDisable = async (id) => {
    try {
      const { data } = await axiosInstance.patch("/auth/disable/" + id);

      api.success({
        message: "Désactivation réussie",
        description: data.message,
      });

      const temp = givers.map((elem) => {
        if (elem._id === id) {
          elem.status = false;
        }
        return elem;
      });

      setGivers(temp);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleActivate = async (id) => {
    try {
      const { data } = await axiosInstance.patch("/auth/activate/" + id);
      api.success({
        message: "Validation réussie",
        description: data.message,
      });

      const temp = givers.map((elem) => {
        if (elem._id === id) {
          elem.status = true;
        }
        return elem;
      });

      setGivers(temp);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const columns = [
    {
      title: "Nom complet",
      children: [
        {
          title: "Prénom",
          dataIndex: "first_name",
          key: "first_name",
        },
        {
          title: "Nom",
          dataIndex: "last_name",
          key: "last_name",
        },
      ],
    },
    {
      title: "Âge",
      dataIndex: "birthDate",
      key: "birthDate",
      render: (birthDate) => (
        <Tooltip
          title={"Date de naissance: " + dayjs(birthDate).format("DD/MM/YYYY")}
          style={{ cursor: "pointer" }}
        >
          {dayjs().diff(birthDate, "years")}
        </Tooltip>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Badge(s)",
      dataIndex: "role",
      render: (_, record) => <Tag color="red">{record.role}</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <GiverDrawer json={record} />
          <Button
            size="small"
            onClick={() => {
              if (record?.status === true) {
                handleDisable(record._id);
              } else {
                handleActivate(record._id);
              }
            }}
          >
            {record?.status === true ? "Désactiver" : "Activer"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
        dataSource={givers}
        title={() => "Donneurs"}
      />
    </>
  );
};
export default DonneurList;
