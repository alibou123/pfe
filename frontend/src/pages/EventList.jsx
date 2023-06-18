import { Button, Popconfirm, Space, Table, Input, Tag, Typography, message } from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef, useContext } from "react";
import axiosInstance from "../utils/axios";
import Highlighter from "react-highlight-words";
import EventDrawer from "../components/EventDrawer";
import GlobalContext from "../contexts/GlobalContext";

const { Text } = Typography;

const EventList = () => {
  const { role, fullName } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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
    async function fetchEvents() {
      const { data } = await axiosInstance.get("/factory/events");

      console.log(fullName);
      if (role === "Admin") {
        setEvents(data.events);
        setLoading(false);
        return data;
      } else {
        const temp = data.events.filter((elem) =>
          elem.deliberates.find((elem) => elem === fullName)
        );
        setEvents(temp);
        setLoading(false);
        return data;
      }
    }
    fetchEvents();
  }, [role]);

  const columns = [
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      ...getColumnSearchProps("name", "nom"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
      render: (text) => (
        <Typography.Paragraph
          style={{ margin: 0 }}
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: "Plus",
          }}
        >
          {text}
        </Typography.Paragraph>
      ),
    },
    {
      title: "Compétence(s) nécessaire(s)",
      dataIndex: "skills",
      width: 250,
      render: (_, record) => (
        <>
          {record?.skills.length > 0
            ? record?.skills.map((elem) => <Tag color="red">{elem}</Tag>)
            : "N/A"}
        </>
      ),
    },
    {
      title: "Period",
      key: "date",
      width: 260,
      render: (_, record) => (
        <Typography.Text>
          {dayjs(record.start_date).format("DD/MM/YYYY")} -{" "}
          {dayjs(record.end_date).format("DD/MM/YYYY")}
        </Typography.Text>
      ),
    },
    {
      title: "Volantaire",
      dataIndex: "deliberates",
      key: "deliberates",
      render: (_, record) => (
        <Space>
          {record?.deliberates?.length > 0 ? (
            record?.deliberates.map((elem) => {
              return <Tag color="magenta">{elem}</Tag>;
            })
          ) : (
            <Text>Aucune donnée</Text>
          )}
        </Space>
      ),
    },
    {
      title: "Membres",
      dataIndex: "members",
      key: "members",
      render: (_, record) => (
        <div>
          {record?.members?.length > 0 ? (
            record?.members?.map((elem) => {
              return <Tag color="red">{elem}</Tag>;
            })
          ) : (
            <Text>N/A</Text>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EventDrawer json={record} events={events} setEvents={setEvents} />
          {role === "Admin" && (
            <Popconfirm
              title="Supprimer l'événement"
              description="Êtes-vous sûr de vouloir supprimer cet événement ?"
              okText="Oui"
              onConfirm={async () => {
                const {data} = await axiosInstance.delete("/event/delete/"+record._id);
                const temp =  events.filter((elem) => elem._id !== record._id);
                setEvents(temp);
                message.success("L'événement a été supprimée avec succée")
              }}
              cancelText="Non"
            >
              <Button size="small" danger type="primary">
                Supprimer
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={events}
      scroll={{ x: "max-content" }}
      pagination={{
        pageSize: 5,
      }}
      loading={loading}
      title={() => "Liste des événements"}
    />
  );
};
export default EventList;
