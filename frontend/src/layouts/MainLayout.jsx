import { useContext, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faCalendarDays,
  faCalendarPlus,
  faGear,
  faHandHoldingHand,
  faMarker,
  faPeopleGroup,
  faPlusCircle,
  faQuoteLeft,
  faRightFromBracket,
  faStopwatch,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/logo.png";

import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";

const { Header, Sider, Content } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const App = () => {
  const { role } = useContext(GlobalContext);
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    role === "Admin" &&
      getItem(
        <Link to="/dashboard/deliberate/list" className="decoration-none">
          Volantaires
        </Link>,
        "1",
        <FontAwesomeIcon icon={faPeopleGroup} />
      ),
    role !== "Donneur" &&
      getItem(
        <Link to="#" className="decoration-none">
          Événements
        </Link>,
        "2",
        <FontAwesomeIcon icon={faCalendarDays} />,
        [
          role === "Admin" &&
            getItem(
              <Link to="/dashboard/event/form" className="decoration-none">
                Ajouter
              </Link>,
              "21",
              <FontAwesomeIcon icon={faCalendarPlus} />
            ),
          getItem(
            <Link to="/dashboard/event/list" className="decoration-none">
              Consulter
            </Link>,
            "22",
            <FontAwesomeIcon icon={faTableList} />
          ),
        ]
      ),

    role !== "Donneur" &&
      getItem(
        <Link to="#" className="decoration-none">
          Donneur
        </Link>,
        "3",
        <FontAwesomeIcon icon={faPeopleGroup} />,
        [
          role !== "Donneur" &&
            getItem(
              <Link to="/dashboard/giver/form" className="decoration-none">
                Ajouter
              </Link>,
              "31",
              <FontAwesomeIcon icon={faPlusCircle} />
            ),
          getItem(
            <Link to="/dashboard/giver/list" className="decoration-none">
              Consulter
            </Link>,
            "32",
            <FontAwesomeIcon icon={faTableList} />
          ),
        ]
      ),
    getItem(
      <Link to="#" className="decoration-none">
        Dons
      </Link>,
      "4",
      <FontAwesomeIcon icon={faHandHoldingHand} />,
      [
        role !== "Donneur" &&
          getItem(
            <Link to="/dashboard/donation/form" className="decoration-none">
              Ajouter
            </Link>,
            "41",
            <FontAwesomeIcon icon={faPlusCircle} />
          ),
        getItem(
          <Link to="/dashboard/donation/list" className="decoration-none">
            Consulter
          </Link>,
          "42",
          <FontAwesomeIcon icon={faTableList} />
        ),
      ]
    ),

    role === "Admin" &&
      getItem(
        <Link to="/dashboard/supply/type" className="decoration-none">
          Type don
        </Link>,
        "9",
        <FontAwesomeIcon icon={faBoxesStacked} />
      ),
    role !== "Donneur" &&
      getItem(
        <Link to="#" className="decoration-none">
          Horaire
        </Link>,
        "6",
        <FontAwesomeIcon icon={faStopwatch} />,
        [
          role !== "Admin" &&
            getItem(
              <Link to="/dashboard/hourly/form" className="decoration-none">
                Ajouter
              </Link>,
              "61",
              <FontAwesomeIcon icon={faPlusCircle} />
            ),
          getItem(
            <Link to="/dashboard/hourly/list" className="decoration-none">
              Consulter
            </Link>,
            "62",
            <FontAwesomeIcon icon={faTableList} />
          ),
        ]
      ),
    role === "Admin" &&
      getItem(
        <Link to="#" className="decoration-none">
          Posts
        </Link>,
        "7",
        <FontAwesomeIcon icon={faQuoteLeft} />,
        [
          getItem(
            <Link to="/dashboard/post/form" className="decoration-none">
              Ajouter
            </Link>,
            "71",
            <FontAwesomeIcon icon={faPlusCircle} />
          ),
          getItem(
            <Link to="/dashboard/post/list" className="decoration-none">
              Consulter
            </Link>,
            "72",
            <FontAwesomeIcon icon={faTableList} />
          ),
        ]
      ),
    role === "Admin" &&
      getItem(
        <Link to="/dashboard/category" className="decoration-none">
          Catégories
        </Link>,
        "8",
        <FontAwesomeIcon icon={faMarker} />
      ),
    getItem(
      <Link to="params" className="decoration-none">
        Mon compte
      </Link>,
      "11",
      <FontAwesomeIcon icon={faGear} />
    ),
    getItem(
      <Link to="/login" className="decoration-none">
        Se déconnecter
      </Link>,
      "10",
      <FontAwesomeIcon icon={faRightFromBracket} />
    ),
  ];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-vh-100">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="vertical" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex justify-content-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <img
            src={logo}
            style={{
              width: "45px",
              height: "45px",
              marginRight: "15px",
              marginTop: "10px",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            // overflowY: "scroll",
            overflow: "initial",
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
