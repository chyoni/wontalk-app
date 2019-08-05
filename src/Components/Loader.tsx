import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader: React.SFC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"small"} color={"white"} />
    </View>
  );
};

export default Loader;
