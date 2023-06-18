import React from "react";
import CategoryForm from "../components/CategoryForm";
import CategoryList from "../components/CategoryList";

const TypeStock = () => {
  return (
    <div className="row">
      <div className="col-lg-6 col-md-6 col-sm-12">
        <CategoryForm />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <CategoryList />
      </div>
    </div>
  );
};

export default TypeStock;
