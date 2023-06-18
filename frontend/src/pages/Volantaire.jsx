import {
  Button,
  Space,
  Table,
  Tag,
  Tooltip,
  Input,
  Typography,
  notification,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import Highlighter from "react-highlight-words";
import axiosInstance from "../utils/axios";
import dayjs from "dayjs";
import VolontaireDrawer from "../components/VolontaireDrawer";

const Volantaire = () => {
  const [users, setUsers] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex, name) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Rechercher ${name}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axiosInstance.get("/factory/users");
      console.log(data);
      setUsers(data.users);
    }
    fetchUsers();
  }, []);

  const handleDisable = async (id) => {
    try {
      const { data } = await axiosInstance.patch("/auth/disable/" + id);

      api.success({
        message: "Désactivation réussie",
        description: data.message,
      });

      const temp = users.map((elem) => {
        if (elem._id === id) {
          elem.status = false;
        }
        return elem;
      });

      setUsers(temp);
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
          ...getColumnSearchProps("first_name", "prénom"),
        },
        {
          title: "Nom",
          dataIndex: "last_name",
          key: "last_name",
          ...getColumnSearchProps("first_name", "prénom"),
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
      title: "Adresse",
      dataIndex: "adress",
      key: "adress",
      render: (adress) => (
        <Typography.Text>{adress ? adress : "N/A"}</Typography.Text>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email", "email"),
    },
    {
      title: "Badge(s)",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <>
          {record.status ? (
            <>
              {record.role !== "Volontaire" ? (
                <Space>
                  <Tag color="magenta">Volontaire</Tag>
                  <Tag color="red">Membre</Tag>
                </Space>
              ) : (
                <Tag color="magenta">Volontaire</Tag>
              )}
            </>
          ) : (
            <>
              <Tag color="red">Non valide</Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <VolontaireDrawer json={record} users={users} setUsers={setUsers} />
          <Button
            size="small"
            type="primary"
            danger
            onClick={() => handleDisable(record._id)}
          >
            Désactiver
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      {contextHolder}
      <Table
        dataSource={users}
        columns={columns}
        scroll={{ x: "max-content" }}
        pagination={{
          pageSize: 5,
        }}
        title={() => "Volantaires"}
      />
    </>
  );
};
export default Volantaire;
