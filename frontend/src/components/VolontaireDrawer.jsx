import { Button, Drawer, Space, Tag, message, notification } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
0;
import axiosInstance from "../utils/axios";
const VolontaireDrawer = ({ json, setUsers, users }) => {
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const handleActivate = async () => {
    try {
      const { data } = await axiosInstance.patch("/auth/activate/" + json?._id);
      api.success({
        message: "Validation réussie",
        description: data.message,
      });

      const temp = users.map((elem) => {
        if (elem._id === json?._id) {
          elem.status = true;
        }
        return elem;
      });

      setUsers(temp);

      onClose();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const handleChangeRole = async (role, id) => {
    try {
      const { data } = await axiosInstance.patch("/auth/set/role/" + id, {
        role: role,
      });

      const temp = users.map((elem) => {
        if (elem._id === id) {
          elem.role = role;
        }
        return elem;
      });

      setUsers(temp);
    } catch (error) {
      message.error(error.reponse.data.message);
    }
  };

  return (
    <>
      {contextHolder}
      <a onClick={showDrawer}>Consulter</a>
      <Drawer
        title={json?.first_name + " " + json?.last_name}
        width={620}
        closable={true}
        onClose={onClose}
        open={open}
      >
        <div>
          <p>
            <span style={{ fontWeight: 500 }}> Nom complet</span>:{" "}
            {json?.first_name + " " + json?.last_name}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Date de naissance:</span>{" "}
            {dayjs(json?.birthDate).format("DD/MM/YYYY")}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Adresse</span>:{" "}
            {json?.adress ? json?.adress : "N/A"}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Email</span>: {json?.email}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Numéro du téléphone</span>:{" "}
            {json?.phone_number}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Compétence</span>: {json?.skill}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Description compétence:</span>{" "}
            {json?.skill_description}
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Badge(s)</span>:{" "}
            {json?.status ? (
              <>
                {json?.role !== "Volontaire" ? (
                  <Space>
                    <Tag color="red">Membre</Tag>
                    <Tag color="magenta">Volontaire</Tag>
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
          </p>
          <p>
            <span style={{ fontWeight: 500 }}> Occupation</span>:{" "}
            {json?.occupation}
          </p>
        </div>
        <Button disabled={json?.status} type="primary" onClick={handleActivate}>
          Valider
        </Button>
        <Button
          type="primary"
          className="mx-2"
          onClick={() => {
            handleChangeRole("Member", json?._id);
          }}
        >
          Mettre en tant que membre
        </Button>

        <Button
          type="primary"
          className="mx-2"
          onClick={() => {
            handleChangeRole("Volontaire", json?._id);
          }}
        >
          Mettre en tant que Volontaire
        </Button>

        <Drawer
          title="Two-level Drawer"
          width={320}
          closable={false}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          This is two-level drawer
        </Drawer>
      </Drawer>
    </>
  );
};
export default VolontaireDrawer;
