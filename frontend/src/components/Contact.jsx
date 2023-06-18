import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="bg-light vh-100 shadow-lg text-center d-flex justify-content-evenly flex-column mt-custom" id="contact">
      <h2 className="text-center fw-bold ">Contactez Nous</h2>
      <div>
        <a className="btn-blue-custom ">CONTACTEZ NOUS</a>
      </div>
      <div className="row mx-5 ">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <FontAwesomeIcon
            icon={faPhone}
            style={{ fontSize: "32px", color: "#ff0000" }}
            className="mb-2"
          />
          <h5 className="mb-3">Téléphone</h5>
          <h6 className="fw-light text-muted">+216 71 325 572</h6>
          <h6 className="fw-light text-muted">+216 71 320 630</h6>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <FontAwesomeIcon
            icon={faPhone}
            style={{ fontSize: "32px", color: "#ff0000" }}
            className="mb-2"
          />
          <h5 className="mb-3">Fax</h5>
          <h6 className="fw-light text-muted">+216 71 320 251</h6>
          <h6 className="fw-light text-muted">+216 71 253 052</h6>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ fontSize: "32px", color: "#ff0000" }}
            className="mb-2"
          />
          <h5 className="mb-3">Addresse</h5>
          <h6 className="fw-light text-muted">19, Rue d'Angleterre</h6>
          <h6 className="fw-light text-muted">1000 Tunis</h6>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{ fontSize: "32px", color: "#ff0000" }}
            className="mb-2"
          />
          <h5 className="mb-3">Email</h5>
          <h6 className="fw-light text-muted">contact@croissant-rouge.tn</h6>
          {/* <h6 className="fw-light text-muted">+216 71 320 630</h6> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
