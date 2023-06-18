import { Button, Drawer, Timeline } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
const GiverDrawer = ({ json }) => {
  const [open, setOpen] = useState(false);
  const [donations, setDonations] = useState([]);
  const [events, setEvents] = useState([]);
  const [childrenDrawer, setChildrenDrawer] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axiosInstance.get(
        "/factory/donations/givers/by/" + json?._id
      );

      setDonations(data.donations);

      return data;
    }

    async function fetchEvents() {
      const { data } = await axiosInstance.get("/factory/events");

      setEvents(data.events);

      return data;
    }
    fetchEvents();

    fetchData();
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
  return (
    <>
      <Button type="primary" size="small" onClick={showDrawer}>
        Consulter don(s)
      </Button>
      <Drawer
        title={"Don(s) du " + json.first_name + " " + json.last_name}
        width={520}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Timeline>
          {donations.map((elem) => {
            return (
              <Timeline.Item className="fw-bold">
                <span>
                  {elem.product_name} (quantité: {elem.quantity}){" "}
                  {elem._id_event
                    ? "affecté à " +
                      events?.find((elemnt) => elemnt._id === elem._id_event)
                        ?.name
                    : "non affecté"}
                </span>
              </Timeline.Item>
            );
          })}
        </Timeline>
        {/* <Button type="primary" onClick={showChildrenDrawer}>
          Two-level drawer
        </Button> */}
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
export default GiverDrawer;
