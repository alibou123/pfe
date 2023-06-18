import React from "react";
import SupplyTypeForm from "../components/SupplyTypeForm";
import SupplyTypeList from "../components/SupplyTypeList";

const TypeStock = () => {
  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12">
        <SupplyTypeForm />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <SupplyTypeList />
      </div>
    </div>
  );
};

export default TypeStock;
