import { Button, Space, Table, Tag, Typography } from "antd";
import dayjs from "dayjs";
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    email: "Jhon@email.fr",
    age: "T-shirt (xl)",
    Type: "Type 1",
    phoneNumber: "+21699999999",
    tags: Date.now(),
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    email: "GreenJim@email.fr",
    age: "T-shirt (xs)",
    phoneNumber: "+21699999999",
    Type: "Type 2",
    tags: Date.now(),
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    email: "JoeBlack@email.fr",
    age: "T-shirt (m)",
    Type: "Type 3",
    phoneNumber: "+21699999999",
    tags: Date.now(),
  },
];
const stock = () => (
  <>
    <Table dataSource={data} title={() => "Stock"}>
      {/* <ColumnGroup title="Nom complet">
        <Column title="Prénom" dataIndex="firstName" key="firstName" />
        <Column title="Nom" dataIndex="lastName" key="lastName" />
      </ColumnGroup> */}
      <Column title="Nom produit donnée" dataIndex="age" key="age" />
      <Column title="Quantité" dataIndex="key" key="key" />
      <Column title="Type" dataIndex="Type" key="Type" />
      <Column
        title="Date"
        dataIndex="Date"
        key="Date"
        render={(text) => (
          <Typography.Text>{dayjs(text).format("DD/MM/YYYY")}</Typography.Text>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <Button size="small" type="">
              Modifier
            </Button>
            <Button size="small" type="">
              Affecter à
            </Button>
            <Button size="small" type="primary" danger>
              Supprimer
            </Button>
          </Space>
        )}
      />
    </Table>
  </>
);
export default stock;
