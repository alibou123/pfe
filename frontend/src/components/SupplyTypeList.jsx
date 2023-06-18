import { Button, Space, Table, Tag, Typography, message } from "antd";
import dayjs from "dayjs";
import { useContext, useEffect } from "react";
import GlobalContext from "../contexts/GlobalContext";
import axiosInstance from "../utils/axios";
import EditStockType from "./EditStockType";
const { Column } = Table;

const SupplyTypeList = () => {
  const { stockType, setStockType } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get("/factory/stock/types");

      setStockType(data.stockTypes);

      return data;
    }

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstance.delete("/stock/type/delete/" + id);
      const temp = stockType.filter((elem) => elem._id !== id);
      setStockType(temp);
      message.success("Le type du stock à supprimée avec succès");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  return (
    <>
      <Table dataSource={stockType} title={() => "Liste des types de dons"}>
        <Column title="Nom type" dataIndex="name" key="name" />
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
              <EditStockType record={record} />
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
export default SupplyTypeList;
