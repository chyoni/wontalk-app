import React from "react";
import { useIsLoggedIn } from "../../AuthContext";
import { View, Text } from "react-native";
import AuthNavigation from "../Navigation/AuthNavigation";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? (
    <View>
      <Text>LoggedIn</Text>
    </View>
  ) : (
    <AuthNavigation />
  );
};
