import { Button, Drawer, Select, Tag, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../contexts/GlobalContext";
import dayjs from "dayjs";
import axiosInstance from "../utils/axios";

const DonationDrawer = ({ json, donations, setDonations }) => {
  const { role } = useContext(GlobalContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await axiosInstance.get("/factory/events");

      setEvents(data.events);

      return data;
    }
    fetchEvents();
  }, []);

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

  const onChange = (e) => {
    setSelectedEvent(e);
  };

  const handleUpdate = async () => {
    if (!selectedEvent) {
      api.error({
        message: "Erreur",
        description: "Veuillez sélectionner un événement !",
        duration: 2,
      });
    }
    try {
      const { data } = await axiosInstance.patch(
        "/donation/affect/" + json._id,
        {
          _id_event: selectedEvent,
        }
      );

      const temp = donations.map((elem) => {
        if (elem._id === json._id) {
          elem._id_event = selectedEvent;
          elem.status === "Affected";
        }
        return elem;
      });

      setDonations(temp);

      api.success({
        message: "Don enregistrer",
        description: "Le don a été affecté à un événement avec succès",
        duration: 2,
      });
    } catch (error) {
      api.error({
        message: "Erreur",
        description: error.response.data.message,
        duration: 2,
      });
    }
  };

  return (
    <>
      <Button size="small" onClick={showDrawer}>
        Consulter
      </Button>
      <Drawer
        title="Details"
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
      >
        {contextHolder}
        {/* <Button type="primary" onClick={showChildrenDrawer}>
          Two-level drawer
        </Button> */}
        {role !== "Donneur" && (
          <p>
            <span className="fw-bold">Nom complet du donneur : </span>
            {json.giver_first_name + " " + json.giver_last_name}
          </p>
        )}
        <p>
          <span className="fw-bold">Nom du produit : </span>
          {json.product_name}
        </p>
        <p>
          <span className="fw-bold">Type du produit : </span>
          {json.type_donation}
        </p>
        <p>
          <span className="fw-bold">Quantité : </span>
          {json.quantity}
        </p>
        <p>
          <span className="fw-bold">Date : </span>
          {dayjs(json.date_given).format("DD/MM/YYYY")}
        </p>
        <p>
          <span className="fw-bold">Statut : </span>
          <Tag color={json.status === "Pending" ? "orange" : "green"}>
            {json.status === "Pending" ? "Non encore validé" : "Validé"}
          </Tag>
        </p>
        {role === "Admin" && (
          <>
            {!json?._id_event && (
              <>
                <label>Affecter le don à un certain événement</label>
                <Select
                  onChange={onChange}
                  className="w-100"
                  placeholder="Choisir un événement"
                >
                  {events?.map((elem) => (
                    <Select.Option value={elem._id}>{elem.name}</Select.Option>
                  ))}
                </Select>
                <Button type="primary" className="mt-2" onClick={handleUpdate}>
                  Affecter
                </Button>
              </>
            )}
          </>
        )}

        {json._id_event && (
          <p>
            Le don a été affecté à l'événement "
            {events?.find((elem) => elem._id === json._id_event)?.name}"
          </p>
        )}

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
export default DonationDrawer;
