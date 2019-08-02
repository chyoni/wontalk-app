import React from "react";
import { useIsLoggedIn } from "../../AuthContext";
import { View, Text } from "react-native";

export default () => {
  const isLoggedIn = useIsLoggedIn();
  return isLoggedIn ? (
    <View>
      <Text>LoggedIn</Text>
    </View>
  ) : (
    <View>
      <Text>LoggedOut</Text>
    </View>
  );
};
