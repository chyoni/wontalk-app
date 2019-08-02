import React from "react";
import { View, Text } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Chats: React.SFC<IProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Chats</Text>
    </View>
  );
};

export default Chats;
