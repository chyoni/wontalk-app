import React from "react";
import { useIsLoggedIn } from "../../AuthContext";
import AuthNavigation from "../Navigation/AuthNavigation";
import MainNavigation from "../Navigation/MainNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? <MainNavigation /> : <AuthNavigation />;
};
