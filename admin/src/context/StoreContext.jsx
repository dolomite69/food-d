import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext({
  token: "",
  setToken: () => {},
  admin: false,
  setAdmin: () => {},
});

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
      if (localStorage.getItem("admin")) {
        setAdmin(localStorage.getItem("admin") === "true");
      }
    };
    loadData();
  }, []);

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
