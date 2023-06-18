import { useState } from "react";
import GlobalContext from "./GlobalContext";
import LocalStorageService from "../utils/localStorageService";
import jwt_decode from "jwt-decode";

const AppContext = (props) => {
  const [role, setRole] = useState(
    LocalStorageService().getAccessToken()
      ? jwt_decode(LocalStorageService().getAccessToken()).role
      : ""
  );
  const [fullName, setFullName] = useState(
    LocalStorageService().getAccessToken()
      ? jwt_decode(LocalStorageService().getAccessToken()).fullName
      : ""
  );
  const [categories, setCategories] = useState([]);
  const [stockType, setStockType] = useState([]);
  return (
    <GlobalContext.Provider
      value={{
        setRole,
        role,
        categories,
        setCategories,
        stockType,
        setStockType,
        fullName,
        setFullName,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
