import { Button, Space, Table, Tag, Typography, message } from "antd";
import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";
import { useEffect } from "react";
import axiosInstance from "../utils/axios";
import EditSkill from "./EditSkill";
const { Column } = Table;

const CategoryList = () => {
  const { categories, setCategories } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/skills");

      setCategories(data.skillCategories);

      return data;
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstance.delete(
        "/skill/category/delete/" + id
      );
      const temp = categories.filter((elem) => elem._id !== id);
      setCategories(temp);
      message.success("Catégorie supprimée avec succès");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  return (
    <>
      <Table
        dataSource={categories}
        title={() => "Liste des category"}
        pagination={{
          pageSize: 5,
        }}
      >
        <Column title="Nom category" dataIndex="name" key="name" />
        <Column
          title="Date d'ajout"
          dataIndex="date"
          key="date"
          render={(text) => (
            <Typography.Text>
              {dayjs(text).format("DD/MM/YYYY")}
            </Typography.Text>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <EditSkill record={record} />
              <Button
                size="small"
                type="primary"
                danger
                onClick={() => handleDelete(record._id)}
              >
                Supprimer
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default CategoryList;
