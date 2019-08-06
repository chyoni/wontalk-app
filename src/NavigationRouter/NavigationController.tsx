import React from "react";
import { useIsLoggedIn } from "../../AuthContext";
import AuthNavigation from "../Navigation/AuthNavigation";
import RootNavigation from "../Navigation/RootNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? <RootNavigation /> : <AuthNavigation />;
};
