import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-md navbar-light fixed-top bg-light shadow-sm"
      aria-label="Fourth navbar example"
    >
      <div className="container-fluid">
        <div className="d-block justify-content-between w-100 d-lg-flex">
          <a
            className="navbar-brand fw-bold"
            style={{ color: "#ff0000", fontSize: "24px" }}
            href="#"
          >
            Croissant Rouge Tunisien Nabeul
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse w-100" id="navbarsExample04">
            <ul className="navbar-nav mb-2 mb-md-0 w-100 justify-content-start justify-content-lg-end">
              <li className="nav-item">
                <a className="nav-link" href="#accueil">
                  Accueil
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  Qui sommes nous
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#actuality">
                  Actualité
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#principle">
                  Nos principes
                </a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li>
                <Button
                  type="primary"
                  className="mt-1"
                  onClick={() => Navigate("/login")}
                >
                  Connectez-vous
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
