import React from "react";

const Opening = () => {
  return (
    <div className="vh-100 masthead masked text-white vw-100 mt-5 " id="accueil">
      <div
        class="container h-100"
        style={{ position: "relative", zIndex: "1", color: "#fff" }}
      >
        <div className="d-flex h-100 align-items-center justify-content-center">
          <div class="row">
            <div class="lead col-lg-5">
              <h1 className="h1-custom" style={{ fontSize: "46px" }}>
                Croissant Rouge Tunisien
              </h1>
              <p
                class="lead-text fw-bold"
                style={{ color: "#909090", margin: "0 0 30px 0" }}
              >
                En dépit du danger, nous travaillons dans plus de 244
                Délégations. Fidèles aux principes de humanité , neutralité,
                d'impartialité et d'indépendance.
              </p>
              <div class="lead-controls">
                <a href="#request" class="btn-lead btn" data-toggle="modal">
                  Contactez Nous
                </a>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Opening;
