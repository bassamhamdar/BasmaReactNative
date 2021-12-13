import React, { useState } from "react";
import LoginContext from "./LoginContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginProvider = ({ children }) => {
  const [loginError, setLoginError] = useState("");
  const [Customers, setCustomers] = useState({});
  const login = async (email, password, navigation) => {
    try {
      const loginData = {
        email: email,
        password: password,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        "http://192.168.3.55:8000/api/admin/login",
        loginData,
        config
      );
      const data = response.data;
      if (!data.success) {
        throw new Error(data.message);
      }

      AsyncStorage.setItem("token", data.token);
      setLoginError();
      navigation.navigate("Home");
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const logout = async (navigation) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };

      const response = await axios.post(
        "http://192.168.3.55:8000/api/admin/logout",
        {},
        config
      );
      const data = response.data;

      console.log("logout data", data);

      if (!data.success) {
        throw new Error(data.message);
      }

      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err.message);
    }
  };

  const getData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      };
      const response = await axios.get(
        "http://192.168.3.55:8000/api/admin/customers/count",
        config
      );

      setCustomers(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const context = {
    state: { loginError, Customers },
    actions: { logout, login, getData },
  };

  return (
    <LoginContext.Provider value={context}>{children}</LoginContext.Provider>
  );
};

export default LoginProvider;
