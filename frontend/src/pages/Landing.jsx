import React, { useEffect, useState } from "react";
import { FloatButton, Tooltip } from "antd";
import Navbar from "../components/Navbar";
import Opening from "../components/Opening";
import Association from "../components/Association";
import Objectives from "../components/Objectives";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import JoinUsModal from "../components/JoinUsModal";
import Activities from "../components/Activities";

const Landing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setTimeout(() => {
      showModal();
    }, [10000]);
  }, []);

  const Navigate = useNavigate();
  return (
    <div className="min-vh-100 overflow-x-hidden">
      <Navbar />
      <Opening />
      <Association />
      <Activities />
      <Objectives />
      <Contact />
      <Footer />
      <Tooltip title="Rejoignez-nous">
        <FloatButton
          type="primary"
          icon={<FontAwesomeIcon icon={faRightToBracket} />}
          onClick={() => showModal()}
        />
      </Tooltip>
      <JoinUsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default Landing;
