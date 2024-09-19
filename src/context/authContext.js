import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { GET_ACCESS } from "../api/endpoints";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    const checkAccessToken = async () => {
      const response = await axios.get(GET_ACCESS);

      console.log("check Response :: ", response.data.statusCode);
          if (response.data.statusCode===200) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
    };
    checkAccessToken();

  }, []);
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, toggle, setToggle }}
    >
      {children}
    </AuthContext.Provider>
  );
};
