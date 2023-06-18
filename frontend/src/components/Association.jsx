import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const Association = () => {
  const [statistic, setStatistic] = useState([]);
  useEffect(() => {
    async function fetchData () {
      const {data} = await axiosInstance.get("/factory/statistics");
      setStatistic(data);
      console.log(data)
    }
    fetchData();
  }, [])

  return (
    <div className="shadow-lg bg-light" id="about">
      <div className="container ">
        <div
          className="row d-flex align-items-center justify-content-between"
          style={{ height: "75vh" }}
        >
          <div className="col-lg-5 col-md-5 col-sm-12 ">
            <h2 className="title-uppercase fw-bold">
              {" "}
              Association à but non lucratif{" "}
            </h2>
            <span style={{ color: " red", fontWeight: "bold" }}>
              {" "}
              Le Croissant Rouge Tunisien{" "}
            </span>{" "}
            est une organisation d’intérêt public, créée le 7 octobre 1956, et
            reconnue par décret du 6 mai 1957 comme organisation bénévole d’aide
            et de secours auxiliaire des pouvoirs publics dans le domaine
            humanitaire, conformément aux Conventions de Genève de 1949 et ses
            protocoles additionnels.
            <span style={{ color: " red", fontWeight: "bold" }}>
              {" "}
              Le Croissant Rouge Tunisien{" "}
            </span>
            est devenu membre du mouvement International de la Croix Rouge et du
            Croissant Rouge le 13 septembre 1957.
          </div>
          <div
            className="col-lg-6 col-md-6 col-sm-12"
            style={{ marginTop: "-50px" }}
          >
            <div className="progress-bars">
              <div
                className="clearfix"
                style={{ color: "#ff0000", fontWeight: "bold" }}
              >
                <div className="number pull-left text-uppercase">
                  Nombres des évenements
                </div>
                <div className="number pull-right">{statistic?.actifEvents}</div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div
                className="clearfix"
                style={{ color: "#ff0000", fontWeight: "bold" }}
              >
                <div className="number pull-left">VOLONTAIRES ACTIFS</div>
                <div className="number pull-right">{statistic?.actifMembers}</div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "80%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div
                className="clearfix"
                style={{ color: "#ff0000", fontWeight: "bold" }}
              >
                <div className="number pull-left text-uppercase">
                  Nombre des donneurs
                </div>
                <div className="number pull-right">{statistic?.actifGivers}</div>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "70%" }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Association;
