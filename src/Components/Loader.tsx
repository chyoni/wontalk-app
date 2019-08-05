import React from "react";
import { ActivityIndicator, View } from "react-native";

const Loader: React.SFC = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"small"} color={"black"} />
    </View>
  );
};

export default Loader;
