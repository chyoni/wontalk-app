import React, { createContext, useState, useContext } from "react";
import { AsyncStorage } from "react-native";

interface IContextProps {
  isLoggedIn: boolean;
  logUserIn: (token: any) => Promise<void>;
  logUserOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IContextProps);

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoggedInProp);

  const logUserIn = async (token: any) => {
    try {
      await AsyncStorage.setItem("jwt", token);
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};
