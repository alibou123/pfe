import React from "react";
import { FacebookFilled } from "@ant-design/icons";
const Footer = () => {
  return (
    <div
      style={{ height: "20vh" }}
      className="bg-white d-flex justify-content-center align-items-center flex-column"
    >
      <a
        href="https://www.facebook.com/CroissantRougeTunisienPageOfficielle/"
        className="contact-btn"
      >
        <FacebookFilled />
      </a>
      <div>© 2023 croissant rouge tunisien. All rights reserved</div>
    </div>
  );
};

export default Footer;
